const axios = require("axios");
const express = require("express");
const { resolve } = require("node:path");
const Papa = require("papaparse");
const pg = require("pg");
const QueryStream = require("pg-query-stream");
const Op = require("sequelize").Op;
const Excel = require("exceljs");
const { getActiveSchema } = require("../middleware");
const { knex } = require("../utilities/database");
const logger = require("../utilities/logger");
const log = logger.logger;
const {
  StreamingService,
  ExcelTransform,
} = require("../utilities/streamingService");

function tryParseJSON(value) {
  try {
    return {
      isJSON: true,
      value: JSON.parse(value),
    };
  } catch (e) {
    return {
      isJSON: false,
      value,
    };
  }
}

function appendToWhere(query, paramName, paramValue) {
  if (!paramValue) return;

  const parsedParam = tryParseJSON(paramValue);

  if (Array.isArray(parsedParam.value)) {
    query.whereIn(paramName, parsedParam.value);
  } else {
    query.where(paramName, parsedParam.value);
  }
}

function parseCriteria(query, profile, queryParams) {
  switch (profile) {
    case "assessments":
      appendToWhere(query, "id", queryParams.id);
      appendToWhere(query, "reporting_cycle", queryParams.reportingCycle);
      appendToWhere(query, "assessment_unit_id", queryParams.assessmentUnitId);
      appendToWhere(
        query,
        "assessment_unit_name",
        queryParams.assessmentUnitName
      );
      appendToWhere(query, "organization_id", queryParams.organizationId);
      appendToWhere(query, "organization_name", queryParams.organizationName);
      appendToWhere(query, "organization_type", queryParams.organizationType);
      appendToWhere(query, "overall_status", queryParams.overallStatus);
      appendToWhere(query, "region", queryParams.region);
      appendToWhere(query, "state", queryParams.state);
      appendToWhere(query, "ir_category", queryParams.irCategory);
      break;
    case "ProfileTest":
      appendToWhere(query, "id", queryParams.id);
      appendToWhere(query, "assessment_name", queryParams.assessmentName);
      break;
    default:
      break;
  }
}

async function executeQuery(model, req, res, next) {
  // output types csv, tab-separated, Excel, or JSON
  try {
    const query = knex.withSchema(req.activeSchema).select("*").from(model);

    parseCriteria(query, model, req.query);

    const stream = await query.stream({
      batchSize: 2000,
      highWaterMark: 10000,
    });

    const format = req.query.format ?? req.query.f;
    switch (format) {
      case "csv":
      case "tsv":
        // output the data
        res.setHeader(
          "Content-disposition",
          `attachment; filename=${model}.${format}`
        );
        StreamingService.streamResponse(res, stream, format);
        break;
      case "xlsx":
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${model}.xlsx`
        );

        res._write = function (chunk, encoding, next) {
          that.push(chunk);
          next();
        };

        const workbook = new Excel.stream.xlsx.WorkbookWriter({
          stream: res,
          useStyles: true,
        });

        workbook.addWorksheet(model);
        const worksheet = workbook.getWorksheet(model);

        stream
          .pipe(
            new ExcelTransform({
              workbook,
              worksheet,
            })
          )
          .pipe(process.stdout);
        break;
      case "json":
      default:
        res.setHeader(
          "Content-disposition",
          `attachment; filename=${model}.json`
        );
        StreamingService.streamResponse(res, stream, format);
        break;
    }
  } catch (error) {
    log.error(`Failed to get data from the "${model}" profile...`);
    return res.status(500).send("Error !" + error);
  }
}

function executeQueryCountOnly(model, req, res, next) {
  // always return json with the count
  try {
    const query = knex
      .withSchema(req.activeSchema)
      .count("id")
      .from(model)
      .first();

    parseCriteria(query, model, req.query);

    query
      .then((count) => res.status(200).send(count))
      .catch((error) => res.status(500).send("Error! " + error));
  } catch (error) {
    log.error(`Failed to get count from the "${model.name}" profile...`);
    return res.status(500).send("Error !" + error);
  }
}

module.exports = function (app) {
  const router = express.Router();

  router.use(getActiveSchema);

  // --- get assessments from database
  router.get("/assessments", function (req, res, next) {
    executeQuery("assessments", req, res, next);
  });
  router.get("/assessments/count", function (req, res, next) {
    executeQueryCountOnly("assessments", req, res, next);
  });

  // --- get profile_test from database
  router.get("/profileTests", function (req, res, next) {
    executeQuery("profile_test", req, res, next);
  });
  router.get("/profileTests/count", function (req, res, next) {
    executeQueryCountOnly("profile_test", req, res, next);
  });

  app.use("/data", router);
};
