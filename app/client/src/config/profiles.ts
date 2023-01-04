export default {
  actions: {
    description: 'Descriptions of actions',
    fields: [
      'actionAgency',
      'actionId',
      'actionName',
      'assessmentUnitId',
      'assessmentUnitName',
      'completionDate',
      'inIndianCountry',
      'includeInMeasure',
      'organizationId',
      'organizationName',
      'parameter',
      'region',
      'state',
      'waterType',
    ],
    label: 'Actions',
    resource: 'actions',
  },
  assessmentUnits: {
    description: 'Description of assessment units',
    fields: [
      'assessmentUnitId',
      'assessmentUnitName',
      'assessmentUnitState',
      'locationText',
      'organizationId',
      'organizationName',
      'region',
      'state',
      'useClassName',
      'waterType',
    ],
    label: 'Assessment Units',
    resource: 'assessmentUnits',
  },
  assessments: {
    description: 'Description of assessments',
    fields: [
      'alternateListingIdentifier',
      'assessmentBasis',
      'assessmentDate',
      'assessmentMethods',
      'assessmentTypes',
      'assessmentUnitId',
      'assessmentUnitName',
      'assessmentUnitStatus',
      'associatedActionAgency',
      'associatedActionId',
      'associatedActionName',
      'associatedActionStatus',
      'associatedActionType',
      'consentDegreeCycle',
      'cwa303dPriorityRanking',
      'cycleExpectedToAttain',
      'cycleFirstListed',
      'cycleLastAssessed',
      'cycleScheduledForTmdl',
      'delisted',
      'delistedReason',
      'epaIrCategory',
      'monitoringEndDate',
      'monitoringStartDate',
      'organizationId',
      'organizationName',
      'overallStatus',
      'parameterAttainment',
      'parameterGroup',
      'parameterIrCategory',
      'parameterName',
      'parameterStateIrCategory',
      'parameterStatus',
      'pollutantIndicator',
      'region',
      'reportingCycle',
      'seasonEndDate',
      'seasonStartDate',
      'state',
      'stateIrCategory',
      'useClassName',
      'useIrCategory',
      'useGroup',
      'useName',
      'useStateIrCategory',
      'useSupport',
      'vision303dPriority',
      'waterType',
    ],
    label: 'Assessments',
    resource: 'assessments',
  },
  assessmentUnitsMonitoringLocations: {
    description: 'Description of assessment units with monitoring locations',
    fields: [
      'assessmentUnitId',
      'assessmentUnitName',
      'assessmentUnitStatus',
      'monitoringLocationDataLink',
      'monitoringLocationId',
      'monitoringLocationOrgId',
      'organizationId',
      'organizationName',
      'region',
      'reportingCycle',
      'state',
      'useClassName',
      'waterType',
    ],
    label: 'Assessment Units with Monitoring Locations',
    resource: 'assessmentUnitsMonitoringLocations',
  },
  catchmentCorrespondence: {
    description: 'Description of Catchment Correspondence',
    fields: [
      'assessmentUnitId',
      'assessmentUnitName',
      'catchmentNhdplusId',
      'organizationId',
      'organizationName',
      'region',
      'reportingCycle',
      'state',
    ],
    label: 'Catchment Correspondence',
    resource: 'catchmentCorrespondence',
  },
  sources: {
    description: 'Description of Sources',
    fields: [
      'assessmentUnitId',
      'assessmentUnitName',
      'causeName',
      'confirmed',
      'epaIrCategory',
      'organizationId',
      'organizationName',
      'overallStatus',
      'parameterGroup',
      'region',
      'reportingCycle',
      'sourceName',
      'state',
      'stateIrCategory',
      'waterType',
    ],
    label: 'Sources',
    resource: 'sources',
  },
  tmdl: {
    description: 'Description of Total Maximum Daily Load',
    fields: [
      'actionAgency',
      'actionId',
      'actionName',
      'addressedParameter',
      'assessmentUnitId',
      'assessmentUnitName',
      'assessmentUnitStatus',
      'completionDate',
      'explicitMarginOfSafety',
      'fiscalYearEstablished',
      'implicitMarginOfSafety',
      'inIndianCountry',
      'includeInMeasure',
      'loadAllocation',
      'loadAllocationUnits',
      'npdesIdentifier',
      'organizationId',
      'organizationName',
      'otherIdentifier',
      'pollutant',
      'region',
      'sourceType',
      'tmdlDate',
      'tmdlEndpoint',
      'wasteLoadAllocation',
      'waterType',
    ],
    label: 'Total Maximum Daily Load',
    resource: 'tmdl',
  },
} as const;
