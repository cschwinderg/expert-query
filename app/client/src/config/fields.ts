import type { Profile } from './profiles';

export const filterGroups: {
  [P in Profile]: Array<{
    key: keyof typeof filterGroupLabels;
    fields: string[];
  }>;
} = {
  actions: [
    {
      key: 'areaOfInterest',
      fields: [
        'region',
        'state',
        'organizationType',
        'organizationName',
        'organizationId',
        'waterType',
      ],
    },
    {
      key: 'parameter',
      fields: ['parameter'],
    },
    {
      key: 'action',
      fields: [
        'actionType',
        'actionId',
        'actionName',
        'actionAgency',
        'inIndianCountry',
        'includeInMeasure',
        'completionDateLo',
        'completionDateHi',
      ],
    },
    {
      key: 'actionsAssessmentUnit',
      fields: ['assessmentUnitId', 'assessmentUnitName'],
    },
  ],
  assessments: [
    {
      key: 'areaOfInterest',
      fields: [
        'region',
        'state',
        'organizationType',
        'organizationName',
        'organizationId',
        'waterType',
      ],
    },
    {
      key: 'reportingCycle',
      fields: ['reportingCycle', 'cycleLastAssessedLo', 'cycleLastAssessedHi'],
    },
    {
      key: 'assessmentUnit',
      fields: [
        'assessmentUnitId',
        'assessmentUnitName',
        'assessmentUnitStatus',
      ],
    },
    {
      key: 'overallStatus',
      fields: ['overallStatus', 'epaIrCategory', 'stateIrCategory'],
    },
    {
      key: 'use',
      fields: [
        'useGroup',
        'useName',
        'useClassName',
        'useSupport',
        'useIrCategory',
        'useStateIrCategory',
        'monitoringStartDateLo',
        'monitoringStartDateHi',
        'monitoringEndDateLo',
        'monitoringEndDateHi',
        'assessmentDateLo',
        'assessmentDateHi',
        'assessmentTypes',
        'assessmentMethods',
        'assessmentBasis',
      ],
    },
    {
      key: 'parameter',
      fields: [
        'parameterGroup',
        'parameterName',
        'parameterStatus',
        'parameterAttainment',
        'parameterIrCategory',
        'parameterStateIrCategory',
        'delisted',
        'delistedReason',
        'pollutantIndicator',
        'cycleFirstListedLo',
        'cycleFirstListedHi',
        'alternateListingIdentifier',
        'vision303dPriority',
        'cwa303dPriorityRanking',
        'cycleScheduledForTmdlLo',
        'cycleScheduledForTmdlHi',
        'cycleExpectedToAttainLo',
        'cycleExpectedToAttainHi',
        'consentDecreeCycleLo',
        'consentDecreeCycleHi',
        'seasonStartDateLo',
        'seasonStartDateHi',
        'seasonEndDateLo',
        'seasonEndDateHi',
      ],
    },
    {
      key: 'associatedAction',
      fields: [
        'associatedActionId',
        'associatedActionName',
        'associatedActionType',
        'associatedActionStatus',
        'associatedActionAgency',
      ],
    },
  ],
  assessmentUnits: [
    {
      key: 'areaOfInterest',
      fields: [
        'region',
        'state',
        'organizationType',
        'organizationName',
        'organizationId',
        'waterType',
        'locationText',
        'useClassName',
      ],
    },
    {
      key: 'assessmentUnit',
      fields: [
        'assessmentUnitId',
        'assessmentUnitName',
        'assessmentUnitStatus',
        'reportingCycle',
      ],
    },
  ],
  assessmentUnitsMonitoringLocations: [
    {
      key: 'areaOfInterest',
      fields: [
        'region',
        'state',
        'organizationType',
        'organizationName',
        'organizationId',
        'waterType',
        'useClassName',
        'monitoringLocationId',
        'monitoringLocationOrgId',
      ],
    },
    {
      key: 'assessmentUnit',
      fields: [
        'assessmentUnitId',
        'assessmentUnitName',
        'assessmentUnitStatus',
        'reportingCycle',
      ],
    },
  ],
  catchmentCorrespondence: [
    {
      key: 'areaOfInterest',
      fields: [
        'region',
        'state',
        'organizationType',
        'organizationName',
        'organizationId',
      ],
    },
    {
      key: 'catchmentAssessmentUnit',
      fields: [
        'assessmentUnitId',
        'assessmentUnitName',
        'catchmentNhdPlusId',
        'reportingCycle',
      ],
    },
  ],
  sources: [
    {
      key: 'areaOfInterest',
      fields: [
        'region',
        'state',
        'organizationType',
        'organizationName',
        'organizationId',
        'waterType',
      ],
    },
    {
      key: 'assessmentUnit',
      fields: ['assessmentUnitId', 'assessmentUnitName', 'reportingCycle'],
    },
    {
      key: 'overallStatus',
      fields: ['overallStatus', 'epaIrCategory', 'stateIrCategory'],
    },
    {
      key: 'impairmentCause',
      fields: ['parameterGroup', 'causeName'],
    },
    {
      key: 'impairmentSource',
      fields: ['sourceName', 'confirmed'],
    },
  ],
  tmdl: [
    {
      key: 'areaOfInterest',
      fields: [
        'region',
        'state',
        'organizationType',
        'organizationName',
        'organizationId',
        'waterType',
      ],
    },
    {
      key: 'pollutantParameter',
      fields: ['pollutant', 'addressedParameter', 'sourceType'],
    },
    {
      key: 'permitId',
      fields: ['npdesIdentifier', 'otherIdentifier'],
    },
    {
      key: 'tmdl',
      fields: [
        'actionId',
        'actionName',
        'actionAgency',
        'inIndianCountry',
        'explicitMarginOfSafety',
        'implicitMarginOfSafety',
        'includeInMeasure',
      ],
    },
    {
      key: 'timeFrame',
      fields: [
        'completionDateLo',
        'completionDateHi',
        'tmdlDateLo',
        'tmdlDateHi',
        'fiscalYearEstablishedLo',
        'fiscalYearEstablishedHi',
      ],
    },
    {
      key: 'actionsAssessmentUnit',
      fields: ['assessmentUnitId', 'assessmentUnitName'],
    },
  ],
};

export const filterGroupLabels = {
  action: 'Search for a specific Action',
  actionsAssessmentUnit:
    'Search for Actions containing a specific Assessment Unit',
  areaOfInterest: 'Search for an Area of Interest',
  assessmentUnit: 'Search for a specific Assessment Unit',
  associatedAction: 'Search by Associated Action',
  catchmentAssessmentUnit: 'Search by Assessment Unit or NHDPlus Catchment',
  impairmentCause: 'Seach by Cause of Impairment',
  impairmentSource: 'Search by Probable Source of Impairment',
  overallStatus: 'Search by Overall Status',
  parameter: 'Search by Parameter',
  permitId: 'Search by Permit ID',
  pollutantParameter: 'Search by Pollutant or Parameter',
  reportingCycle: 'Search for Reporting Cycle',
  timeFrame: 'Search by Time Frame',
  tmdl: 'Search for a specific TMDL',
  use: 'Search by Use',
};

export const filterFields = [
  {
    key: 'actionAgency',
    label: 'Action Agency',
    type: 'multiselect',
  },
  {
    key: 'actionId',
    label: 'Action ID',
    type: 'multiselect',
  },
  {
    key: 'actionName',
    label: 'Action Name',
    type: 'multiselect',
  },
  {
    key: 'addressedParameter',
    label: 'Addressed Parameter',
    type: 'multiselect',
  },
  {
    key: 'alternateListingIdentifier',
    label: 'Alternate Listing ID',
    type: 'multiselect',
  },
  {
    key: 'assessmentBasis',
    label: 'Assessment Basis',
    type: 'multiselect',
  },
  {
    key: 'assessmentDateLo',
    label: 'Assessment Date',
    type: 'date',
    domain: 'assessmentDate',
    boundary: 'low',
  },
  {
    key: 'assessmentDateHi',
    label: 'Assessment Date',
    type: 'date',
    domain: 'assessmentDate',
    boundary: 'high',
  },
  {
    key: 'assessmentMethods',
    label: 'Assessment Methods',
    type: 'multiselect',
  },
  {
    key: 'assessmentTypes',
    label: 'Assessment Type',
    type: 'multiselect',
  },
  {
    key: 'assessmentUnitId',
    label: 'Assessment Unit ID',
    type: 'multiselect',
  },
  {
    key: 'assessmentUnitName',
    label: 'Assessment Unit Name',
    type: 'multiselect',
  },
  {
    key: 'assessmentUnitStatus',
    label: 'Assessment Unit Status',
    type: 'multiselect',
    default: {
      value: 'A',
      label: 'Active',
    },
  },
  {
    key: 'associatedActionAgency',
    label: 'Associated Action Agency',
    type: 'multiselect',
  },
  {
    key: 'associatedActionId',
    label: 'Associated Action ID',
    type: 'multiselect',
  },
  {
    key: 'associatedActionName',
    label: 'Associated Action Name',
    type: 'multiselect',
  },
  {
    key: 'associatedActionStatus',
    label: 'Associated Action Status',
    type: 'multiselect',
  },
  {
    key: 'associatedActionType',
    label: 'Associated Action Type',
    type: 'multiselect',
  },
  {
    key: 'catchmentNhdPlusId',
    label: 'Catchment NHDPlus ID',
    type: 'multiselect',
  },
  {
    key: 'causeName',
    label: 'Cause Name',
    type: 'multiselect',
  },
  {
    key: 'completionDateLo',
    label: 'Completion Date',
    type: 'date',
    domain: 'completionDate',
    boundary: 'low',
  },
  {
    key: 'completionDateHi',
    label: 'Completion Date',
    type: 'date',
    domain: 'completionDate',
    boundary: 'high',
  },
  {
    key: 'confirmed',
    label: 'Source Confirmed',
    type: 'multiselect',
  },
  {
    key: 'consentDecreeCycleLo',
    label: 'Consent Decree Cycle',
    type: 'year',
    domain: 'consentDecreeCycle',
    boundary: 'low',
  },
  {
    key: 'consentDecreeCycleHi',
    label: 'Consent Decree Cycle',
    type: 'year',
    domain: 'consentDecreeCycle',
    boundary: 'high',
  },
  {
    key: 'cwa303dPriorityRanking',
    label: 'CWA 303d Priority Ranking',
    type: 'multiselect',
  },
  {
    key: 'cycleExpectedToAttainLo',
    label: 'Cycle Expected to Attain',
    type: 'year',
    domain: 'cycleExpectedToAttain',
    boundary: 'low',
  },
  {
    key: 'cycleExpectedToAttainHi',
    label: 'Cycle Expected to Attain',
    type: 'year',
    domain: 'cycleExpectedToAttain',
    boundary: 'high',
  },
  {
    key: 'cycleFirstListedLo',
    label: 'Cycle First Listed',
    type: 'year',
    domain: 'cycleFirstListed',
    boundary: 'low',
  },
  {
    key: 'cycleFirstListedHi',
    label: 'Cycle First Listed',
    type: 'year',
    domain: 'cycleFirstListed',
    boundary: 'high',
  },
  {
    key: 'cycleLastAssessedLo',
    label: 'Cycle Last Assessed',
    type: 'year',
    domain: 'cycleLastAssessed',
    boundary: 'low',
  },
  {
    key: 'cycleLastAssessedHi',
    label: 'Cycle Last Assessed',
    type: 'year',
    domain: 'cycleLastAssessed',
    boundary: 'high',
  },
  {
    key: 'cycleScheduledForTmdlLo',
    label: 'Cycle Scheduled for TMDL',
    type: 'year',
    domain: 'cycleScheduledForTmdl',
    boundary: 'low',
  },
  {
    key: 'cycleScheduledForTmdlHi',
    label: 'Cycle Scheduled for TMDL',
    type: 'year',
    domain: 'cycleScheduledForTmdl',
    boundary: 'high',
  },
  {
    key: 'delisted',
    label: 'Delisted',
    type: 'multiselect',
  },
  {
    key: 'delistedReason',
    label: 'Delisted Reason',
    type: 'multiselect',
  },
  {
    key: 'epaIrCategory',
    label: 'EPA IR Category',
    type: 'multiselect',
  },
  {
    key: 'explicitMarginOfSafety',
    label: 'Explicit Margin of Safety',
    type: 'multiselect',
  },
  {
    key: 'fiscalYearEstablishedLo',
    label: 'Fiscal Year Established',
    type: 'year',
    domain: 'fiscalYearEstablished',
    boundary: 'low',
  },
  {
    key: 'fiscalYearEstablishedHi',
    label: 'Fiscal Year Established',
    type: 'year',
    domain: 'fiscalYearEstablished',
    boundary: 'high',
  },
  {
    key: 'implicitMarginOfSafety',
    label: 'Implicit Margin of Safety',
    type: 'multiselect',
  },
  {
    key: 'includeInMeasure',
    label: 'Include in Measure',
    type: 'multiselect',
  },
  {
    key: 'inIndianCountry',
    label: 'In Indian Country',
    type: 'multiselect',
  },
  {
    key: 'locationText',
    label: 'Location Text',
    type: 'multiselect',
    source: 'locationText_locationTypeCode',
  },
  {
    key: 'monitoringEndDateLo',
    label: 'Monitoring End Date',
    type: 'date',
    domain: 'monitoringEndDate',
    boundary: 'low',
  },
  {
    key: 'monitoringEndDateHi',
    label: 'Monitoring End Date',
    type: 'date',
    domain: 'monitoringEndDate',
    boundary: 'high',
  },
  {
    key: 'monitoringLocationId',
    label: 'Monitoring Location ID',
    type: 'multiselect',
  },
  {
    key: 'monitoringLocationOrgId',
    label: 'Monitoring Location Organization ID',
    type: 'multiselect',
  },
  {
    key: 'monitoringStartDateLo',
    label: 'Monitoring Start Date',
    type: 'date',
    domain: 'monitoringStartDate',
    boundary: 'low',
  },
  {
    key: 'monitoringStartDateHi',
    label: 'Monitoring Start Date',
    type: 'date',
    domain: 'monitoringStartDate',
    boundary: 'high',
  },
  {
    key: 'npdesIdentifier',
    label: 'NPDES ID',
    type: 'multiselect',
  },
  {
    key: 'organizationId',
    label: 'Organization ID',
    type: 'multiselect',
    source: 'organizationId_organizationType',
  },
  {
    key: 'organizationName',
    label: 'Organization Name',
    type: 'multiselect',
  },
  {
    key: 'otherIdentifier',
    label: 'Other Identifier',
    type: 'multiselect',
  },
  {
    key: 'overallStatus',
    label: 'Overall Status',
    type: 'multiselect',
  },
  {
    key: 'parameter',
    label: 'Parameter',
    type: 'multiselect',
  },
  {
    key: 'parameterAttainment',
    label: 'Parameter Attainment',
    type: 'multiselect',
  },
  {
    key: 'parameterGroup',
    label: 'Parameter Group',
    type: 'multiselect',
  },
  {
    key: 'parameterIrCategory',
    label: 'Parameter IR Category',
    type: 'multiselect',
  },
  {
    key: 'parameterName',
    label: 'Parameter Name',
    type: 'multiselect',
    tooltip:
      'The dropdown list contains only active (non-retired) parameter names.',
  },
  {
    key: 'parameterStateIrCategory',
    label: 'Parameter State IR Category',
    type: 'multiselect',
  },
  {
    key: 'parameterStatus',
    label: 'Parameter Status',
    type: 'multiselect',
  },
  {
    key: 'pollutant',
    label: 'Pollutant',
    type: 'multiselect',
  },
  {
    key: 'pollutantIndicator',
    label: 'Pollutant Indicator',
    type: 'multiselect',
  },
  {
    key: 'region',
    label: 'Region',
    type: 'multiselect',
  },
  {
    key: 'reportingCycle',
    label: 'Reporting Cycle',
    type: 'select',
    default: { value: '', label: 'Latest' },
    direction: 'desc',
  },
  {
    key: 'seasonEndDateLo',
    label: 'Season End Date',
    type: 'date',
    domain: 'seasonEndDate',
    boundary: 'low',
  },
  {
    key: 'seasonEndDateHi',
    label: 'Season End Date',
    type: 'date',
    domain: 'seasonEndDate',
    boundary: 'high',
  },
  {
    key: 'seasonStartDateLo',
    label: 'Season Start Date',
    type: 'date',
    domain: 'seasonStartDate',
    boundary: 'low',
  },
  {
    key: 'seasonStartDateHi',
    label: 'Season Start Date',
    type: 'date',
    domain: 'seasonStartDate',
    boundary: 'high',
  },
  {
    key: 'sourceName',
    label: 'Source Name',
    type: 'multiselect',
  },
  {
    key: 'sourceType',
    label: 'Source Type',
    type: 'multiselect',
  },
  {
    key: 'state',
    label: 'State',
    type: 'multiselect',
  },
  {
    key: 'stateIrCategory',
    label: 'State IR Category',
    type: 'multiselect',
  },
  {
    key: 'tmdlDateLo',
    label: 'TMDL Date',
    type: 'date',
    domain: 'tmdlDate',
    boundary: 'low',
  },
  {
    key: 'tmdlDateHi',
    label: 'TMDL Date',
    type: 'date',
    domain: 'tmdlDate',
    boundary: 'high',
  },
  {
    key: 'useClassName',
    label: 'Use Class Name',
    type: 'multiselect',
  },
  {
    key: 'useGroup',
    label: 'Use Group',
    type: 'multiselect',
  },
  {
    key: 'useIrCategory',
    label: 'Use IR Category',
    type: 'multiselect',
  },
  {
    key: 'useName',
    label: 'Use Name',
    type: 'multiselect',
  },
  {
    key: 'useStateIrCategory',
    label: 'Use State IR Category',
    type: 'multiselect',
  },
  {
    key: 'useSupport',
    label: 'Use Support',
    type: 'multiselect',
  },
  {
    key: 'vision303dPriority',
    label: 'Vision 303d Priority',
    type: 'multiselect',
  },
  {
    key: 'waterType',
    label: 'Water Type',
    type: 'multiselect',
  },
] as const;

export const sourceFields = [
  {
    id: 'locationText_locationTypeCode',
    key: 'locationTypeCode',
    label: 'Location Type Code',
    type: 'select',
  },
  {
    id: 'organizationId_organizationType',
    key: 'organizationType',
    label: 'Organization Type',
    type: 'select',
  },
] as const;
