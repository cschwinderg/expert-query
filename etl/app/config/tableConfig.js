// IMPORTANT - Copy any changes to the "app/server/app/config/tableConfig.js" file
export const tableConfig = {
  actions: {
    tableName: 'actions',
    idColumn: 'objectid',
    columns: [
      { name: 'objectid', alias: 'objectId', skipIndex: true },
      { name: 'actionagency', alias: 'actionAgency' },
      { name: 'actionid', alias: 'actionId', includeGinIndex: true },
      { name: 'actionname', alias: 'actionName', includeGinIndex: true },
      { name: 'actiontype', alias: 'actionType', skipIndex: true },
      {
        name: 'assessmentunitid',
        alias: 'assessmentUnitId',
        includeGinIndex: true,
      },
      {
        name: 'assessmentunitname',
        alias: 'assessmentUnitName',
        includeGinIndex: true,
      },
      {
        name: 'completiondate',
        alias: 'completionDate',
        lowParam: 'completionDateLo',
        highParam: 'completionDateHi',
        type: 'timestamptz',
        indexOrder: 'desc',
      },
      { name: 'includeinmeasure', alias: 'includeInMeasure' },
      { name: 'inindiancountry', alias: 'inIndianCountry' },
      {
        name: 'locationdescription',
        alias: 'locationDescription',
        skipIndex: true,
      },
      { name: 'organizationid', alias: 'organizationId' },
      {
        name: 'organizationname',
        alias: 'organizationName',
        includeGinIndex: true,
      },
      { name: 'organizationtype', alias: 'organizationType', skipIndex: true },
      { name: 'parameter', alias: 'parameter' },
      { name: 'region', alias: 'region', includeGinIndex: true },
      { name: 'state', alias: 'state' },
      {
        name: 'watersize',
        alias: 'waterSize',
        type: 'numeric',
        skipIndex: true,
      },
      { name: 'watersizeunits', alias: 'waterSizeUnits', skipIndex: true },
      { name: 'watertype', alias: 'waterType' },
    ],
  },
  assessments: {
    tableName: 'assessments',
    idColumn: 'objectid',
    columns: [
      { name: 'objectid', alias: 'objectId', skipIndex: true },
      {
        name: 'alternatelistingidentifier',
        alias: 'alternateListingIdentifier',
        includeGinIndex: true,
      },
      {
        name: 'assessmentbasis',
        alias: 'assessmentBasis',
        includeGinIndex: true,
      },
      {
        name: 'assessmentdate',
        alias: 'assessmentDate',
        lowParam: 'assessmentDateLo',
        highParam: 'assessmentDateHi',
        type: 'timestamptz',
        indexOrder: 'desc',
      },
      {
        name: 'assessmentmethods',
        alias: 'assessmentMethods',
        includeGinIndex: true,
      },
      { name: 'assessmenttypes', alias: 'assessmentTypes' },
      {
        name: 'assessmentunitid',
        alias: 'assessmentUnitId',
        includeGinIndex: true,
      },
      {
        name: 'assessmentunitname',
        alias: 'assessmentUnitName',
        includeGinIndex: true,
      },
      { name: 'assessmentunitstatus', alias: 'assessmentUnitStatus' },
      { name: 'associatedactionagency', alias: 'associatedActionAgency' },
      {
        name: 'associatedactionid',
        alias: 'associatedActionId',
        includeGinIndex: true,
      },
      {
        name: 'associatedactionname',
        alias: 'associatedActionName',
        includeGinIndex: true,
      },
      { name: 'associatedactionstatus', alias: 'associatedActionStatus' },
      { name: 'associatedactiontype', alias: 'associatedActionType' },
      {
        name: 'consentdecreecycle',
        alias: 'consentDecreeCycle',
        lowParam: 'consentDecreeCycleLo',
        highParam: 'consentDecreeCycleHi',
        type: 'numeric',
        indexOrder: 'desc',
      },
      { name: 'cwa303dpriorityranking', alias: 'cwa303dPriorityRanking' },
      {
        name: 'cycleexpectedtoattain',
        alias: 'cycleExpectedToAttain',
        lowParam: 'cycleExpectedToAttainLo',
        highParam: 'cycleExpectedToAttainHi',
        type: 'numeric',
        indexOrder: 'desc',
      },
      {
        name: 'cyclefirstlisted',
        alias: 'cycleFirstListed',
        lowParam: 'cycleFirstListedLo',
        highParam: 'cycleFirstListedHi',
        type: 'numeric',
        indexOrder: 'desc',
      },
      {
        name: 'cycleid',
        alias: 'cycleId',
        type: 'numeric',
      },
      {
        name: 'cyclelastassessed',
        alias: 'cycleLastAssessed',
        lowParam: 'cycleLastAssessedLo',
        highParam: 'cycleLastAssessedHi',
        type: 'numeric',
        indexOrder: 'desc',
      },
      {
        name: 'cyclescheduledfortmdl',
        alias: 'cycleScheduledForTmdl',
        lowParam: 'cycleScheduledForTmdlLo',
        highParam: 'cycleScheduledForTmdlHi',
        type: 'numeric',
        indexOrder: 'desc',
      },
      { name: 'delisted', alias: 'delisted' },
      { name: 'delistedreason', alias: 'delistedReason' },
      { name: 'epaircategory', alias: 'epaIrCategory', includeGinIndex: true },
      {
        name: 'locationdescription',
        alias: 'locationDescription',
        skipIndex: true,
      },
      {
        name: 'monitoringenddate',
        alias: 'monitoringEndDate',
        lowParam: 'monitoringEndDateLo',
        highParam: 'monitoringEndDateHi',
        type: 'timestamptz',
        indexOrder: 'desc',
      },
      {
        name: 'monitoringstartdate',
        alias: 'monitoringStartDate',
        lowParam: 'monitoringStartDateLo',
        highParam: 'monitoringStartDateHi',
        type: 'timestamptz',
        indexOrder: 'desc',
      },
      { name: 'organizationid', alias: 'organizationId' },
      {
        name: 'organizationname',
        alias: 'organizationName',
        includeGinIndex: true,
      },
      { name: 'organizationtype', alias: 'organizationType', skipIndex: true },
      { name: 'overallstatus', alias: 'overallStatus', includeGinIndex: true },
      {
        name: 'parameterattainment',
        alias: 'parameterAttainment',
        includeGinIndex: true,
      },
      { name: 'parametergroup', alias: 'parameterGroup' },
      {
        name: 'parameterircategory',
        alias: 'parameterIrCategory',
        type: 'numeric',
      },
      { name: 'parametername', alias: 'parameterName' },
      {
        name: 'parameterstateircategory',
        alias: 'parameterStateIrCategory',
        type: 'numeric',
      },
      { name: 'parameterstatus', alias: 'parameterStatus' },
      { name: 'pollutantindicator', alias: 'pollutantIndicator' },
      { name: 'region', alias: 'region', includeGinIndex: true },
      {
        name: 'reportingcycle',
        alias: 'reportingCycle',
        default: 'latest',
        type: 'numeric',
        indexOrder: 'desc',
      },
      {
        name: 'seasonenddate',
        alias: 'seasonEndDate',
        lowParam: 'seasonEndDateLo',
        highParam: 'seasonEndDateHi',
        type: 'timestamptz',
        indexOrder: 'desc',
      },
      {
        name: 'seasonstartdate',
        alias: 'seasonStartDate',
        lowParam: 'seasonStartDateLo',
        highParam: 'seasonStartDateHi',
        type: 'timestamptz',
        indexOrder: 'desc',
      },
      { name: 'sizesource', alias: 'sizeSource', skipIndex: true },
      { name: 'sourcescale', alias: 'sourceScale', skipIndex: true },
      { name: 'state', alias: 'state' },
      { name: 'stateircategory', alias: 'stateIrCategory' },
      { name: 'useclassname', alias: 'useClassName' },
      { name: 'usegroup', alias: 'useGroup', includeGinIndex: true },
      { name: 'useircategory', alias: 'useIrCategory', type: 'numeric' },
      { name: 'usename', alias: 'useName' },
      {
        name: 'usestateircategory',
        alias: 'useStateIrCategory',
        type: 'numeric',
      },
      { name: 'usesupport', alias: 'useSupport' },
      { name: 'vision303dpriority', alias: 'vision303dPriority' },
      {
        name: 'watersize',
        alias: 'waterSize',
        type: 'numeric',
        skipIndex: true,
      },
      { name: 'watersizeunits', alias: 'waterSizeUnits', skipIndex: true },
      { name: 'watertype', alias: 'waterType' },
    ],
  },
  assessmentUnits: {
    tableName: 'assessment_units',
    idColumn: 'objectid',
    columns: [
      { name: 'objectid', alias: 'objectid', skipIndex: true },
      {
        name: 'assessmentunitid',
        alias: 'assessmentUnitId',
        includeGinIndex: true,
      },
      {
        name: 'assessmentunitname',
        alias: 'assessmentUnitName',
        includeGinIndex: true,
      },
      { name: 'assessmentunitstatus', alias: 'assessmentUnitStatus' },
      {
        name: 'cycleid',
        alias: 'cycleId',
        type: 'numeric',
      },
      {
        name: 'locationdescription',
        alias: 'locationDescription',
        skipIndex: true,
      },
      { name: 'locationtext', alias: 'locationText', includeGinIndex: true },
      { name: 'locationtypecode', alias: 'locationTypeCode', skipIndex: true },
      { name: 'organizationid', alias: 'organizationId' },
      {
        name: 'organizationname',
        alias: 'organizationName',
        includeGinIndex: true,
      },
      { name: 'organizationtype', alias: 'organizationType', skipIndex: true },
      { name: 'region', alias: 'region', includeGinIndex: true },
      {
        name: 'reportingcycle',
        alias: 'reportingCycle',
        default: 'latest',
        type: 'numeric',
        indexOrder: 'desc',
      },
      { name: 'sizesource', alias: 'sizeSource', skipIndex: true },
      { name: 'sourcescale', alias: 'sourceScale', skipIndex: true },
      { name: 'state', alias: 'state' },
      { name: 'useclassname', alias: 'useClassName' },
      {
        name: 'watersize',
        alias: 'waterSize',
        type: 'numeric',
        skipIndex: true,
      },
      { name: 'watersizeunits', alias: 'waterSizeUnits', skipIndex: true },
      { name: 'watertype', alias: 'waterType' },
    ],
  },
  assessmentUnitsMonitoringLocations: {
    tableName: 'assessment_units_monitoring_locations',
    idColumn: 'objectid',
    columns: [
      { name: 'objectid', alias: 'objectId', skipIndex: true },
      {
        name: 'assessmentunitid',
        alias: 'assessmentUnitId',
        includeGinIndex: true,
      },
      {
        name: 'assessmentunitname',
        alias: 'assessmentUnitName',
        includeGinIndex: true,
      },
      { name: 'assessmentunitstatus', alias: 'assessmentUnitStatus' },
      {
        name: 'cycleid',
        alias: 'cycleId',
        type: 'numeric',
      },
      {
        name: 'locationdescription',
        alias: 'locationDescription',
        skipIndex: true,
      },
      {
        name: 'monitoringlocationdatalink',
        alias: 'monitoringLocationDataLink',
        skipIndex: true,
      },
      {
        name: 'monitoringlocationid',
        alias: 'monitoringLocationId',
        includeGinIndex: true,
      },
      {
        name: 'monitoringlocationorgid',
        alias: 'monitoringLocationOrgId',
        includeGinIndex: true,
      },
      { name: 'organizationid', alias: 'organizationId' },
      {
        name: 'organizationname',
        alias: 'organizationName',
        includeGinIndex: true,
      },
      { name: 'organizationtype', alias: 'organizationType', skipIndex: true },
      { name: 'region', alias: 'region', includeGinIndex: true },
      {
        name: 'reportingcycle',
        alias: 'reportingCycle',
        default: 'latest',
        type: 'numeric',
        indexOrder: 'desc',
      },
      { name: 'sizesource', alias: 'sizeSource', skipIndex: true },
      { name: 'sourcescale', alias: 'sourceScale', skipIndex: true },
      { name: 'state', alias: 'state' },
      { name: 'useclassname', alias: 'useClassName' },
      {
        name: 'watersize',
        alias: 'waterSize',
        type: 'numeric',
        skipIndex: true,
      },
      { name: 'watersizeunits', alias: 'waterSizeUnits', skipIndex: true },
      { name: 'watertype', alias: 'waterType' },
    ],
  },
  catchmentCorrespondence: {
    tableName: 'catchment_correspondence',
    idColumn: 'objectid',
    columns: [
      { name: 'objectid', alias: 'objectId', skipIndex: true },
      {
        name: 'assessmentunitid',
        alias: 'assessmentUnitId',
        includeGinIndex: true,
      },
      {
        name: 'assessmentunitname',
        alias: 'assessmentUnitName',
        includeGinIndex: true,
      },
      {
        name: 'catchmentnhdplusid',
        alias: 'catchmentNhdPlusId',
        type: 'numeric',
      },
      {
        name: 'cycleid',
        alias: 'cycleId',
        type: 'numeric',
      },
      { name: 'organizationid', alias: 'organizationId' },
      {
        name: 'organizationname',
        alias: 'organizationName',
        includeGinIndex: true,
      },
      { name: 'organizationtype', alias: 'organizationType', skipIndex: true },
      { name: 'region', alias: 'region', includeGinIndex: true },
      {
        name: 'reportingcycle',
        alias: 'reportingCycle',
        default: 'latest',
        type: 'numeric',
        indexOrder: 'desc',
      },
      { name: 'state', alias: 'state' },
    ],
  },
  sources: {
    tableName: 'sources',
    idColumn: 'objectid',
    columns: [
      { name: 'objectid', alias: 'objectId', skipIndex: true },
      {
        name: 'assessmentunitid',
        alias: 'assessmentUnitId',
        includeGinIndex: true,
      },
      {
        name: 'assessmentunitname',
        alias: 'assessmentUnitName',
        includeGinIndex: true,
      },
      { name: 'causename', alias: 'causeName', includeGinIndex: true },
      { name: 'confirmed', alias: 'confirmed' },
      {
        name: 'cycleid',
        alias: 'cycleId',
        type: 'numeric',
      },
      { name: 'epaircategory', alias: 'epaIrCategory', includeGinIndex: true },
      {
        name: 'locationdescription',
        alias: 'locationDescription',
        skipIndex: true,
      },
      { name: 'organizationid', alias: 'organizationId' },
      {
        name: 'organizationname',
        alias: 'organizationName',
        includeGinIndex: true,
      },
      { name: 'organizationtype', alias: 'organizationType', skipIndex: true },
      { name: 'overallstatus', alias: 'overallStatus', includeGinIndex: true },
      { name: 'parametergroup', alias: 'parameterGroup' },
      { name: 'region', alias: 'region', includeGinIndex: true },
      {
        name: 'reportingcycle',
        alias: 'reportingCycle',
        default: 'latest',
        type: 'numeric',
        indexOrder: 'desc',
      },
      { name: 'sourcename', alias: 'sourceName' },
      { name: 'state', alias: 'state' },
      { name: 'stateircategory', alias: 'stateIrCategory' },
      {
        name: 'watersize',
        alias: 'waterSize',
        type: 'numeric',
        skipIndex: true,
      },
      { name: 'watersizeunits', alias: 'waterSizeUnits', skipIndex: true },
      { name: 'watertype', alias: 'waterType' },
    ],
  },
  tmdl: {
    tableName: 'tmdl',
    idColumn: 'objectid',
    columns: [
      { name: 'objectid', alias: 'objectId', skipIndex: true },
      { name: 'actionagency', alias: 'actionAgency' },
      { name: 'actionid', alias: 'actionId', includeGinIndex: true },
      { name: 'actionname', alias: 'actionName', includeGinIndex: true },
      {
        name: 'addressedparameter',
        alias: 'addressedParameter',
        includeGinIndex: true,
      },
      {
        name: 'assessmentunitid',
        alias: 'assessmentUnitId',
        includeGinIndex: true,
      },
      {
        name: 'assessmentunitname',
        alias: 'assessmentUnitName',
        includeGinIndex: true,
      },
      {
        name: 'completiondate',
        alias: 'completionDate',
        lowParam: 'completionDateLo',
        highParam: 'completionDateHi',
        type: 'timestamptz',
        indexOrder: 'desc',
      },
      {
        name: 'explicitmarginofsafety',
        alias: 'explicitMarginOfSafety',
        includeGinIndex: true,
      },
      {
        name: 'fiscalyearestablished',
        alias: 'fiscalYearEstablished',
        lowParam: 'fiscalYearEstablishedLo',
        highParam: 'fiscalYearEstablishedHi',
        indexOrder: 'desc',
      },
      {
        name: 'implicitmarginofsafety',
        alias: 'implicitMarginOfSafety',
        includeGinIndex: true,
      },
      { name: 'includeinmeasure', alias: 'includeInMeasure' },
      { name: 'inindiancountry', alias: 'inIndianCountry' },
      {
        name: 'loadallocation',
        alias: 'loadAllocation',
        type: 'numeric',
        skipIndex: true,
      },
      {
        name: 'loadallocationunits',
        alias: 'loadAllocationUnits',
        skipIndex: true,
      },
      {
        name: 'locationdescription',
        alias: 'locationDescription',
        skipIndex: true,
      },
      {
        name: 'npdesidentifier',
        alias: 'npdesIdentifier',
        includeGinIndex: true,
      },
      { name: 'organizationid', alias: 'organizationId' },
      {
        name: 'organizationname',
        alias: 'organizationName',
        includeGinIndex: true,
      },
      { name: 'organizationtype', alias: 'organizationType', skipIndex: true },
      {
        name: 'otheridentifier',
        alias: 'otherIdentifier',
        includeGinIndex: true,
      },
      { name: 'pollutant', alias: 'pollutant' },
      { name: 'region', alias: 'region', includeGinIndex: true },
      { name: 'sourcetype', alias: 'sourceType' },
      { name: 'state', alias: 'state' },
      {
        name: 'tmdldate',
        alias: 'tmdlDate',
        lowParam: 'tmdlDateLo',
        highParam: 'tmdlDateHi',
        type: 'timestamptz',
        indexOrder: 'desc',
      },
      {
        name: 'wasteloadallocation',
        alias: 'wasteLoadAllocation',
        type: 'numeric',
        skipIndex: true,
      },
      {
        name: 'watersize',
        alias: 'waterSize',
        type: 'numeric',
        skipIndex: true,
      },
      { name: 'watersizeunits', alias: 'waterSizeUnits', skipIndex: true },
      { name: 'watertype', alias: 'waterType' },
    ],
  },
};
