export default [
  { key: 'actionAgency', label: 'Action Agency', type: 'multiselect' },
  { key: 'assessmentTypes', label: 'Assessment Type', type: 'multiselect' },
  {
    key: 'assessmentUnitStatus',
    label: 'Assessment Unit Status',
    type: 'multiselect',
  },
  {
    key: 'associatedActionAgency',
    label: 'Associated Action Agency',
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
  { key: 'confirmed', label: 'Confirmed', type: 'multiselect' },
  {
    key: 'cwa303dPriorityRanking',
    label: 'CWA 303d Priority Ranking',
    type: 'multiselect',
  },
  { key: 'dataProfile', label: 'Data Profile', type: 'select' },
  { key: 'delisted', label: 'Delisted', type: 'multiselect' },
  { key: 'delistedReason', label: 'Delisted Reason', type: 'multiselect' },
  { key: 'format', label: 'File Format', type: 'radio' },
  { key: 'inIndianCountry', label: 'In Indian Country', type: 'multiselect' },
  {
    key: 'loadAllocationUnits',
    label: 'Load Allocation Unit',
    type: 'multiselect',
  },
  // TODO: Add after value endpoint is created
  /* {
    key: 'locationText',
    label: 'Location Text',
    type: 'multiselect',
    context: 'locationTypeCode',
  }, */
  // TODO: Remove this field after it is paired with the `locationText` field
  { key: 'locationTypeCode', label: 'Location Type Code', type: 'multiselect' },
  {
    key: 'organizationId',
    label: 'Organization ID',
    type: 'multiselect',
    context: 'organizationType',
  },
  { key: 'organizationType', label: 'Organization Type', type: 'select' },
  { key: 'parameter', label: 'Parameter', type: 'multiselect' },
  { key: 'parameterGroup', label: 'Parameter Group', type: 'multiselect' },
  { key: 'parameterName', label: 'Parameter Name', type: 'multiselect' },
  {
    key: 'parameterStateIrCategory',
    label: 'Parameter State IR Category',
    type: 'multiselect',
  },
  { key: 'pollutant', label: 'Pollutant', type: 'multiselect' },
  { key: 'sourceName', label: 'Source Name', type: 'multiselect' },
  { key: 'sourceScale', label: 'Source Scale', type: 'multiselect' },
  { key: 'sourceType', label: 'Source Type', type: 'multiselect' },
  { key: 'state', label: 'State', type: 'multiselect' },
  { key: 'stateIrCategory', label: 'State IR Category', type: 'multiselect' },
  { key: 'useClassName', label: 'Use Class Name', type: 'multiselect' },
  { key: 'useName', label: 'Use Name', type: 'multiselect' },
  {
    key: 'useStateIrCategory',
    label: 'Use State IR Category',
    type: 'multiselect',
  },
  { key: 'waterSizeUnits', label: 'Water Size Unit', type: 'multiselect' },
  { key: 'waterType', label: 'Water Type', type: 'multiselect' },
] as const;
