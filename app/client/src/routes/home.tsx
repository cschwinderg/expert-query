import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import Select from 'react-select';
import { ReactComponent as Download } from 'images/file_download.svg';
// components
import { AccordionItem } from 'components/accordion';
import { Alert } from 'components/alert';
import { Checkboxes } from 'components/checkboxes';
import { CopyBox } from 'components/copyBox';
import { InfoTooltip } from 'components/infoTooltip';
import { InPageNavAnchor, NumberedInPageNavLabel } from 'components/inPageNav';
import { Loading } from 'components/loading';
import { DownloadModal } from 'components/downloadModal';
import { ClearSearchModal } from 'components/clearSearchModal';
import { RadioButtons } from 'components/radioButtons';
import { SourceSelect } from 'components/sourceSelect';
import { StepIndicator } from 'components/stepIndicator';
import { Button } from 'components/button';
// contexts
import { useContentState } from 'contexts/content';
// config
import { serverUrl } from 'config';
// utils
import { getData, isAbort, postData, useAbort } from 'utils';
// types
import type { Content } from 'contexts/content';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type {
  DomainOptions,
  MultiOptionField,
  Option,
  SingleOptionField,
  SingleValueField,
  StaticOptions,
  Status,
} from 'types';

/*
## Components
*/

export default Home;

function HomeContent({ content }: { content: Content }) {
  const {
    domainValues,
    filterConfig,
    listOptions,
    profileConfig: profiles,
  } = content;
  const { filterFields, filterGroups, filterGroupLabels, sourceFields } =
    filterConfig;

  const staticOptions = useMemo(() => {
    const domainOptions = addDomainAliases(domainValues);
    // Alphabetize all option lists by label
    return Object.entries({
      ...domainOptions,
      ...listOptions,
    }).reduce<StaticOptions>((sorted, [name, options]) => {
      return {
        ...sorted,
        [name]: (options as Option[]).sort((a, b) => {
          if (typeof a.label === 'string' && typeof b.label === 'string') {
            return a.label.localeCompare(b.label);
          }
          return 0;
        }),
      };
    }, {});
  }, [domainValues, listOptions]);

  const { handleProfileChange, profile, profileOption } = useProfile(
    profiles,
    listOptions,
  );

  const [format, setFormat] = useState<Option>({
    label: 'Comma-separated (CSV)',
    value: 'csv',
  });

  const { initializeFilters, filterState, filterHandlers, resetFilters } =
    useFilterState(filterFields);

  const { sourceState, sourceHandlers } = useSourceState(sourceFields);

  const apiKey = content.services.eqApiKey;
  const apiUrl = `${content.services.eqDataApi || serverUrl}/api/attains`;

  const { queryParams, queryParamErrors } = useQueryParams({
    apiKey,
    apiUrl,
    format: format.value,
    profile,
    staticOptions,
    filterFields,
    filterState,
    initializeFilters,
  });

  const formatProfileOptionLabel = useCallback(
    (option: Option) => {
      const description = Object.entries(profiles).find(
        ([id, _config]) => id === option.value,
      )?.[1].description;
      const refreshDate = Object.entries(content.metadata).find(
        ([id, _metadata]) => id === option.value,
      )?.[1].timestamp;
      return (
        <div className="margin-1">
          <div className="display-flex flex-justify flex-wrap margin-bottom-1">
            <b
              className="font-ui-md margin-right-4 overflow-hidden"
              style={{ textOverflow: 'ellipsis' }}
            >
              {option.label}
            </b>
            {refreshDate && (
              <em className="font-ui-xs">
                <b>Refresh date:</b> {new Date(refreshDate).toLocaleString()}
              </em>
            )}
          </div>
          <span
            className="display-inline-block overflow-hidden width-full"
            style={{ textOverflow: 'ellipsis' }}
          >
            {description}
          </span>
        </div>
      );
    },
    [content, profiles],
  );

  return (
    <div>
      <h1>Query ATTAINS Data</h1>
      <hr />
      <ParameterErrorAlert parameters={queryParamErrors} />
      {staticOptions && (
        <>
          <InPageNavAnchor
            id="data-profile"
            label={
              <NumberedInPageNavLabel number={1}>
                Pick a Data Profile
              </NumberedInPageNavLabel>
            }
          >
            <StepIndicator currentStep={1} totalSteps={3}>
              Pick a Data Profile
            </StepIndicator>
          </InPageNavAnchor>
          <p>
            Data are grouped into profiles according to the type of data they
            describe. Select a data profile to determine the set of filterable
            elements.
          </p>
          <Select
            id="select-data-profile"
            classNames={{
              option: () => 'border-bottom border-base-lighter',
            }}
            instanceId="instance-select-data-profile"
            aria-label="Select a data profile"
            formatOptionLabel={formatProfileOptionLabel}
            onChange={handleProfileChange}
            options={staticOptions.dataProfile}
            placeholder="Select a data profile..."
            styles={{
              container: (baseStyles) => ({
                ...baseStyles,
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr)',
              }),
              menu: (baseStyles) => ({
                ...baseStyles,
                maxHeight: '75vh',
              }),
              menuList: (baseStyles) => ({
                ...baseStyles,
                maxHeight: '75vh',
              }),
            }}
            value={profileOption}
          />

          {profile && (
            <>
              <Outlet
                context={{
                  filterFields,
                  filterGroupLabels,
                  filterGroups: filterGroups[profile.key],
                  filterHandlers,
                  filterState,
                  format,
                  formatHandler: setFormat,
                  profile,
                  queryParams,
                  queryUrl: apiUrl,
                  resetFilters,
                  sourceFields,
                  sourceHandlers,
                  sourceState,
                  staticOptions,
                }}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export function Home() {
  const { content } = useContentState();

  if (content.status === 'pending') return <Loading />;

  if (content.status === 'failure') {
    return (
      <Alert type="error" styles={['margin-top-6']}>
        Expert Query is currently unavailable, please try again later.
      </Alert>
    );
  }

  if (content.status === 'success') {
    return <HomeContent content={content.data} />;
  }

  return null;
}

export function QueryBuilder() {
  const {
    queryParams,
    queryUrl,
    filterFields,
    filterGroupLabels,
    filterGroups,
    filterHandlers,
    filterState,
    format,
    formatHandler,
    profile,
    resetFilters,
    sourceFields,
    sourceHandlers,
    sourceState,
    staticOptions,
  } = useHomeContext();

  const {
    clearConfirmationVisible,
    closeClearConfirmation,
    openClearConfirmation,
  } = useClearConfirmationVisibility();

  const {
    closeDownloadConfirmation,
    downloadConfirmationVisible,
    openDownloadConfirmation,
  } = useDownloadConfirmationVisibility();

  const [downloadStatus, setDownloadStatus] = useDownloadStatus(
    profile,
    filterState,
    format,
    downloadConfirmationVisible || clearConfirmationVisible,
  );

  const { content } = useContentState();

  const apiKey = content.data.services?.eqApiKey || '';
  const apiUrl = `${content.data.services?.eqDataApi || serverUrl}/api/attains`;

  const navigate = useNavigate();

  return (
    <>
      {downloadConfirmationVisible && (
        <DownloadModal
          apiKey={apiKey}
          dataId="attains"
          filename={profile && format ? `${profile}.${format.value}` : null}
          downloadStatus={downloadStatus}
          onClose={closeDownloadConfirmation}
          queryData={queryParams}
          queryUrl={profile ? `${queryUrl}/${profile.resource}` : null}
          setDownloadStatus={setDownloadStatus}
        />
      )}
      {clearConfirmationVisible && (
        <ClearSearchModal
          onContinue={() => {
            resetFilters();
            navigate('/attains', { replace: true });
          }}
          onClose={closeClearConfirmation}
        />
      )}
      <div>
        <div className="margin-top-2">
          <Button onClick={openClearConfirmation} color="white">
            Clear Search
          </Button>
        </div>
        <InPageNavAnchor
          id="apply-filters"
          label={
            <NumberedInPageNavLabel number={2}>
              Apply Filters
            </NumberedInPageNavLabel>
          }
        >
          <StepIndicator currentStep={2} totalSteps={3}>
            Apply Filters
          </StepIndicator>
        </InPageNavAnchor>
        <p>
          Select options from the fields below to apply filters to the query.
          The options of some fields are filtered by previous selections.
        </p>
        <FilterFieldGroups
          apiKey={apiKey}
          apiUrl={apiUrl}
          filterFields={filterFields}
          filterGroupLabels={filterGroupLabels}
          filterGroups={filterGroups}
          filterHandlers={filterHandlers}
          filterState={filterState}
          profile={profile}
          queryParams={queryParams}
          sourceFields={sourceFields}
          sourceHandlers={sourceHandlers}
          sourceState={sourceState}
          staticOptions={staticOptions}
        />

        <InPageNavAnchor
          id="download"
          label={
            <NumberedInPageNavLabel number={3}>
              Download the Data
            </NumberedInPageNavLabel>
          }
        >
          <StepIndicator currentStep={3} totalSteps={3}>
            Download the Data
          </StepIndicator>
        </InPageNavAnchor>
        <p>
          Choose an output file format for the result set, then click the
          download button to proceed.
        </p>
        <RadioButtons
          legend={
            <>
              <b className="margin-right-05">File Format</b>
              <InfoTooltip text="Choose a file format for the result set." />
            </>
          }
          onChange={formatHandler}
          options={staticOptions.format}
          selected={format}
          styles={['margin-bottom-2']}
        />
        <button
          className="display-flex flex-justify-center usa-button"
          onClick={openDownloadConfirmation}
          type="button"
        >
          <Download
            aria-hidden="true"
            className="height-205 margin-right-1 usa-icon width-205"
            role="img"
            focusable="false"
          />
          <span className="margin-y-auto">Download</span>
        </button>
        {downloadStatus === 'success' && (
          <Alert
            styles={['margin-top-3', 'tablet:margin-top-6']}
            type="success"
          >
            Query executed successfully, please check your downloads folder for
            the output file.
          </Alert>
        )}
        {downloadStatus === 'failure' && (
          <Alert styles={['margin-top-3', 'tablet:margin-top-6']} type="error">
            An error occurred while executing the current query, please try
            again later.
          </Alert>
        )}

        <AccordionItem heading="Advanced Queries">
          Visit our{' '}
          <a
            href={`${serverUrl}/api-documentation`}
            target="_blank"
            rel="noopener noreferrer"
          >
            API Documentation
          </a>{' '}
          page to learn more.
          <h4 className="text-primary">Current Query</h4>
          <CopyBox
            testId="current-query-copy-box-container"
            text={`${window.location.origin}${
              window.location.pathname
            }?${buildUrlQueryString(queryParams.filters)}`}
          />
          <h4 className="text-primary">{profile.label} API Query</h4>
          <CopyBox
            testId="api-query-copy-box-container"
            lengthExceededMessage="The GET request for this query exceeds the maximum URL character length. Please use a POST request instead (see the cURL query below)."
            maxLength={2048}
            text={`${queryUrl}/${profile.resource}?${buildUrlQueryString(
              queryParams.filters,
              queryParams.options,
              queryParams.columns,
            )}&api_key=<YOUR_API_KEY>`}
          />
          <h4 className="text-primary">cURL</h4>
          <CopyBox
            testId="curl-copy-box-container"
            text={`curl -X POST --json "${JSON.stringify(
              queryParams,
            ).replaceAll('"', '\\"')}" ${queryUrl}/${
              profile.resource
            } -H "X-Api-Key: <YOUR_API_KEY>"`}
          />
        </AccordionItem>
      </div>
    </>
  );
}

function FilterFieldInputs({
  apiKey,
  apiUrl,
  fields,
  filterFields,
  filterHandlers,
  filterState,
  profile,
  queryParams,
  sourceFields,
  sourceHandlers,
  sourceState,
  staticOptions,
}: FilterFieldInputsProps) {
  // Store each field's element in a tuple with its key
  const fieldsJsx: Array<[JSX.Element, string]> = removeNulls(
    fields.map((fieldConfig) => {
      const sourceFieldConfig =
        'source' in fieldConfig &&
        (fieldConfig.source as string) in sourceFields
          ? sourceFields[fieldConfig.source as string]
          : null;

      switch (fieldConfig.type) {
        case 'multiselect':
        case 'select':
          const initialOptions = getInitialOptions(
            staticOptions,
            fieldConfig.key,
          );

          if (
            !sourceFieldConfig &&
            fieldConfig.type === 'multiselect' &&
            Array.isArray(initialOptions) &&
            initialOptions.length <= 5
          ) {
            return [
              <Checkboxes
                key={fieldConfig.key}
                legend={<b>{fieldConfig.label}</b>}
                onChange={filterHandlers[fieldConfig.key] as OptionInputHandler}
                options={initialOptions}
                selected={
                  (filterState[fieldConfig.key] as MultiOptionState) ?? []
                }
                styles={['margin-top-3']}
              />,
              fieldConfig.key,
            ];
          }

          const sourceKey = sourceFieldConfig?.key ?? null;
          const sourceValue = sourceFieldConfig
            ? sourceState[sourceFieldConfig.id]
            : null;
          const selectProps = {
            apiKey,
            apiUrl,
            contextFilters: getContextFilters(
              fieldConfig,
              Object.values(filterFields).concat(Object.values(sourceFields)),
              profile,
              {
                ...queryParams.filters,
                ...(sourceKey && sourceValue
                  ? { [sourceKey]: sourceValue.value }
                  : {}),
              },
            ),
            defaultOption:
              'default' in fieldConfig ? fieldConfig.default : null,
            filterHandler: filterHandlers[fieldConfig.key],
            filterKey: fieldConfig.key,
            filterLabel: fieldConfig.label,
            filterValue: filterState[fieldConfig.key],
            isMulti: isMultiOptionField(fieldConfig),
            placeholder:
              'placeholder' in fieldConfig ? fieldConfig.placeholder : null,
            profile,
            secondaryFilterKey:
              'secondaryKey' in fieldConfig ? fieldConfig.secondaryKey : null,
            sortDirection:
              'direction' in fieldConfig
                ? (fieldConfig.direction as SortDirection)
                : 'asc',
            sourceKey,
            sourceValue,
            staticOptions,
          } as SelectFilterProps;

          const tooltip = 'tooltip' in fieldConfig ? fieldConfig.tooltip : null;

          return [
            <label
              className="usa-label"
              key={fieldConfig.key}
              htmlFor={`input-${fieldConfig.key}`}
            >
              <span className="display-flex align-items-center">
                <b>{fieldConfig.label}</b>{' '}
                {tooltip && (
                  <InfoTooltip text={tooltip} styles={['margin-left-05']} />
                )}
              </span>
              <div className="margin-top-1">
                {sourceFieldConfig ? (
                  <SourceSelectFilter
                    {...selectProps}
                    sourceHandler={sourceHandlers[sourceFieldConfig.id]}
                    sourceKey={sourceFieldConfig.key}
                    sourceLabel={sourceFieldConfig.label}
                  />
                ) : (
                  <SelectFilter {...selectProps} />
                )}
              </div>
            </label>,
            fieldConfig.key,
          ];
        case 'date':
        case 'year':
          // Prevents range fields from rendering twice
          if (fieldConfig.boundary === 'high') return null;

          const pairedField = fields.find(
            (otherField) =>
              otherField.key !== fieldConfig.key &&
              otherField.type === fieldConfig.type &&
              otherField.domain === fieldConfig.domain,
          );
          // All range inputs should have a high and a low boundary field
          if (!pairedField || !isSingleValueField(pairedField)) return null;

          return [
            <RangeFilter
              domain={fieldConfig.domain!}
              highHandler={
                filterHandlers[pairedField.key] as SingleValueInputHandler
              }
              highKey={pairedField.key}
              highValue={filterState[pairedField.key] as string}
              key={fieldConfig.key}
              label={fieldConfig.label}
              lowHandler={
                filterHandlers[fieldConfig.key] as SingleValueInputHandler
              }
              lowKey={fieldConfig.key}
              lowValue={filterState[fieldConfig.key] as string}
              type={fieldConfig.type}
            />,
            fieldConfig.domain as string,
          ];
        default:
          return null;
      }
    }),
  );

  return (
    <div className="grid-gap-2 grid-row">
      {fieldsJsx.map(([field, key]) => (
        <div className="desktop:grid-col-4 tablet:grid-col-6" key={key}>
          {field}
        </div>
      ))}
    </div>
  );
}

function FilterFieldGroups(props: FilterFieldGroupsProps) {
  const { filterGroupLabels, filterGroups, ...filterFieldsProps } = props;
  const { filterFields } = filterFieldsProps;
  const groupedFields = filterGroups.map((group) => ({
    ...group,
    fields: group.fields
      .map((field) => (field in filterFields ? filterFields[field] : null))
      .filter((field) => field !== null),
  }));

  return (
    <>
      {groupedFields.map((group, i) => {
        const label = filterGroupLabels[group.key];
        const id = camelToKebab(group.key);
        return (
          <section
            className={`margin-top-${i === 0 ? '2' : '4'}`}
            key={group.key}
          >
            <hr />
            <InPageNavAnchor id={id} label={label} subItem>
              <h3 className="font-heading-md margin-bottom-0 text-primary">
                {label}
              </h3>
            </InPageNavAnchor>
            <FilterFieldInputs
              {...filterFieldsProps}
              fields={group.fields as FilterField[]}
            />
          </section>
        );
      })}
    </>
  );
}

function ParameterErrorAlert({
  parameters,
}: {
  parameters: ParameterErrors | null;
}) {
  const [visible, setVisible] = useState(false);

  const closeAlert = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (parameters) setVisible(true);
  }, [parameters]);

  if (!parameters || !visible) return null;

  return (
    <Alert icon={false} type="error">
      {parameters.invalid.size > 0 && (
        <>
          <p className="text-bold">
            The following parameters could not be matched to a valid field under
            the selected profile:
          </p>
          <ul>
            {Array.from(parameters.invalid).map((invalidParam) => (
              <li key={invalidParam}>{invalidParam}</li>
            ))}
          </ul>
        </>
      )}
      {parameters.duplicate.size > 0 && (
        <>
          <p className="text-bold">
            Multiple parameters were provided for the following fields, when
            only a single parameter is allowed:
          </p>
          <ul>
            {Array.from(parameters.duplicate).map((duplicateParam) => (
              <li key={duplicateParam}>{duplicateParam}</li>
            ))}
          </ul>
        </>
      )}
      <div className="display-flex flex-justify-end">
        <button className="usa-button" onClick={closeAlert} type="button">
          Close Alert
        </button>
      </div>
    </Alert>
  );
}

function RangeFilter({
  domain,
  highHandler,
  highKey,
  highValue,
  label,
  lowHandler,
  lowKey,
  lowValue,
  type,
}: RangeFilterProps) {
  return (
    <label className="usa-label" htmlFor={`input-${lowKey}`} key={domain}>
      <b>{label}</b>
      <div className="margin-top-1 usa-hint">from:</div>
      <input
        className="usa-input"
        id={`input-${lowKey}`}
        min={type === 'year' ? 1900 : undefined}
        max={type === 'year' ? 2100 : undefined}
        onChange={lowHandler}
        placeholder={type === 'year' ? 'yyyy' : undefined}
        title={`Start of "${label}" range`}
        type={type === 'date' ? 'date' : 'number'}
        value={lowValue}
      />
      <div className="margin-top-1 usa-hint">to:</div>
      <input
        className="usa-input"
        id={`input-${highKey}`}
        min={type === 'year' ? 1900 : undefined}
        max={type === 'year' ? 2100 : undefined}
        onChange={highHandler}
        placeholder={type === 'year' ? 'yyyy' : undefined}
        title={`End of "${label}" range`}
        type={type === 'date' ? 'date' : 'number'}
        value={highValue}
      />
    </label>
  );
}

function SourceSelectFilter(props: SourceSelectFilterProps) {
  const { sourceLabel, sourceHandler, ...selectFilterProps } = props;
  const { sourceKey, sourceValue, staticOptions } = selectFilterProps;

  return (
    <SourceSelect
      label={sourceLabel}
      sources={getStaticOptions(sourceKey, staticOptions)}
      onChange={sourceHandler}
      selected={sourceValue}
    >
      <SelectFilter {...selectFilterProps} />
    </SourceSelect>
  );
}

function SelectFilter({
  apiKey,
  apiUrl,
  contextFilters,
  defaultOption,
  filterHandler,
  filterKey,
  filterLabel,
  filterValue,
  isMulti = false,
  placeholder,
  profile,
  secondaryFilterKey,
  sortDirection,
  sourceKey,
  sourceValue,
  staticOptions,
}: SelectFilterProps) {
  const { content } = useContentState();
  const { abort, getSignal } = useAbort();

  // Create the filter function from the HOF
  const filterFunc = useMemo(() => {
    return filterOptions({
      apiKey,
      apiUrl,
      defaultOption,
      filters: contextFilters,
      profile: profile.key,
      fieldName: filterKey,
      direction: sortDirection,
      dynamicOptionLimit: content.data?.parameters.selectOptionsPageSize,
      secondaryFieldName: secondaryFilterKey,
      staticOptions,
    });
  }, [
    apiKey,
    apiUrl,
    content,
    contextFilters,
    defaultOption,
    filterKey,
    profile,
    secondaryFilterKey,
    sortDirection,
    staticOptions,
  ]);

  const [options, setOptions] = useState<readonly Option[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchOptions = useCallback(
    async (inputValue: string) => {
      abort();
      setLoading(true);
      try {
        const newOptions = await filterFunc(inputValue, getSignal());
        setLoading(false);
        setOptions(newOptions);
      } catch (err) {
        if (isAbort(err)) return;
        setLoading(false);
        console.error(err);
      }
    },
    [abort, filterFunc, getSignal],
  );

  const debouncedFetchOptions = useMemo(() => {
    if (content.status !== 'success') return null;
    return debounce(
      fetchOptions,
      content.data.parameters.debounceMilliseconds,
      {
        leading: true,
        trailing: true,
      },
    );
  }, [content, fetchOptions]);

  useEffect(() => {
    return function cleanup() {
      debouncedFetchOptions?.cancel();
    };
  }, [debouncedFetchOptions]);

  const loadOptions = (inputValue: string | null = null) =>
    inputValue === null || !debouncedFetchOptions
      ? fetchOptions(inputValue ?? '')
      : debouncedFetchOptions(inputValue);

  const formatOptionLabel = useCallback(
    (option: Option) => {
      return secondaryFilterKey ? (
        <div>
          <span className="text-semibold">{option.value}</span> ({option.label})
        </div>
      ) : (
        option.label
      );
    },
    [secondaryFilterKey],
  );

  return (
    <Select
      aria-label={`${filterLabel} input`}
      className="width-full"
      classNames={{
        container: () => 'font-ui-xs',
        menuList: () => 'font-ui-xs',
      }}
      formatOptionLabel={formatOptionLabel}
      inputId={`input-${filterKey}`}
      instanceId={`instance-${filterKey}`}
      isLoading={loading}
      isMulti={isMulti}
      key={sourceValue?.value}
      menuPortalTarget={document.body}
      onChange={filterHandler}
      onInputChange={(inputValue, actionMeta) => {
        if (actionMeta.action !== 'input-change') return;
        loadOptions(inputValue);
      }}
      onMenuClose={() => {
        abort();
        setLoading(false);
        setOptions(null);
      }}
      onMenuOpen={loadOptions}
      options={options ?? undefined}
      placeholder={
        placeholder ??
        `Select ${getArticle(filterLabel.split(' ')[0])} ${filterLabel}...`
      }
      styles={{
        control: (base) => ({
          ...base,
          border: '1px solid #adadad',
          borderRadius: sourceKey ? '0 4px 4px 0' : '4px',
        }),
        menuPortal: (base) => ({
          ...base,
          zIndex: 9999,
        }),
      }}
      value={filterValue}
    />
  );
}

/*
## Hooks
*/

function useClearConfirmationVisibility() {
  const [clearConfirmationVisible, setClearConfirmationVisible] =
    useState(false);

  const closeClearConfirmation = useCallback(() => {
    setClearConfirmationVisible(false);
  }, []);

  const openClearConfirmation = useCallback(() => {
    setClearConfirmationVisible(true);
  }, []);

  return {
    clearConfirmationVisible,
    closeClearConfirmation,
    openClearConfirmation,
  };
}

function useDownloadConfirmationVisibility() {
  const [downloadConfirmationVisible, setDownloadConfirmationVisible] =
    useState(false);

  const closeDownloadConfirmation = useCallback(() => {
    setDownloadConfirmationVisible(false);
  }, []);

  const openDownloadConfirmation = useCallback(() => {
    setDownloadConfirmationVisible(true);
  }, []);

  return {
    closeDownloadConfirmation,
    downloadConfirmationVisible,
    openDownloadConfirmation,
  };
}

function useDownloadStatus(
  profile: Profile,
  filterState: FilterFieldState,
  format: Option,
  confirmationVisible: boolean,
) {
  const [downloadStatus, setDownloadStatus] = useState<Status>('idle');

  const [prevProfile, setPrevProfile] = useState(profile);
  if (profile !== prevProfile) {
    setPrevProfile(profile);
    setDownloadStatus('idle');
  }

  const [prevFilterState, setPrevFilterState] = useState(filterState);
  if (filterState !== prevFilterState) {
    setPrevFilterState(filterState);
    setDownloadStatus('idle');
  }

  const [prevFormat, setPrevFormat] = useState(format);
  if (format !== prevFormat) {
    setPrevFormat(format);
    setDownloadStatus('idle');
  }

  const [prevConfirmationVisible, setPrevConfirmationVisible] =
    useState(confirmationVisible);
  if (confirmationVisible !== prevConfirmationVisible) {
    setPrevConfirmationVisible(confirmationVisible);
    if (confirmationVisible) setDownloadStatus('idle');
  }

  return [downloadStatus, setDownloadStatus] as [
    Status,
    Dispatch<SetStateAction<Status>>,
  ];
}

function useHomeContext() {
  return useOutletContext<HomeContext>();
}

function useFilterState(filterFields: FilterFields) {
  const [filterState, filterDispatch] = useReducer(
    createFilterReducer(filterFields),
    getDefaultFilterState(filterFields),
  );

  // Memoize individual dispatch functions
  const filterHandlers = useMemo(() => {
    const newHandlers: Partial<FilterFieldInputHandlers> = {};
    Object.values(filterFields).forEach((field) => {
      if (isMultiOptionField(field)) {
        newHandlers[field.key] = (ev: MultiOptionState | SingleOptionState) => {
          if (!Array.isArray(ev)) return;
          filterDispatch({ type: field.key, payload: ev } as FilterFieldAction);
        };
      } else if (isSingleOptionField(field)) {
        newHandlers[field.key] = (ev: MultiOptionState | SingleOptionState) => {
          if (Array.isArray(ev)) return;
          filterDispatch({ type: field.key, payload: ev } as FilterFieldAction);
        };
      } else if (isSingleValueField(field)) {
        newHandlers[field.key] = (ev: ChangeEvent<HTMLInputElement>) => {
          filterDispatch({
            type: field.key,
            payload: ev.target.value,
          } as FilterFieldAction);
        };
      }
    });
    return newHandlers as FilterFieldInputHandlers;
  }, [filterFields]);

  const initializeFilters = useCallback((initialFilters: FilterFieldState) => {
    filterDispatch({ type: 'initialize', payload: initialFilters });
  }, []);

  const resetFilters = useCallback(() => {
    filterDispatch({ type: 'reset' });
  }, []);

  return {
    initializeFilters,
    filterState,
    filterHandlers,
    resetFilters,
  };
}

function useProfile(
  profiles: Content['profileConfig'],
  listOptions: Content['listOptions'],
) {
  const navigate = useNavigate();

  const params = useParams();
  const profileArg = params.profile ?? null;

  const [profileOption, setProfileOption] = useState<Option | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const handleProfileChange = useCallback(
    (ev: Option | null) => {
      const route = ev
        ? `/attains/${ev.value}${window.location.search}`
        : '/attains';
      navigate(route, { replace: true });
    },
    [navigate],
  );

  if (profileArg !== (profile?.key ?? null)) {
    if (!profileArg) {
      setProfile(null);
      setProfileOption(null);
    } else if (!(profileArg in profiles)) {
      navigate('/404');
    } else {
      setProfile(profiles[profileArg]);
      setProfileOption(
        'dataProfile' in listOptions
          ? listOptions.dataProfile.find(
              (option) => option.value === profileArg,
            ) ?? null
          : null,
      );
    }
  }

  return { handleProfileChange, profile, profileOption };
}

function useQueryParams({
  apiKey,
  apiUrl,
  profile,
  filterFields,
  filterState,
  format,
  initializeFilters,
  staticOptions,
}: {
  apiKey: string;
  apiUrl: string;
  profile: Profile | null;
  filterFields: FilterFields;
  filterState: FilterFieldState;
  format: string;
  initializeFilters: (state: FilterFieldState) => void;
  staticOptions: StaticOptions | null;
}) {
  const { getSignal } = useAbort();

  const parameters: QueryData = useMemo(() => {
    if (!profile) return { columns: [], filters: {}, options: {} };
    return {
      columns: Array.from(profile.columns),
      options: { format },
      filters: buildFilterData(filterFields, filterState, profile),
    };
  }, [filterFields, filterState, format, profile]);

  const [parameterErrors, setParameterErrors] =
    useState<ParameterErrors | null>(null);
  const [parametersLoaded, setParametersLoaded] = useState(false);

  // Populate the input fields with URL parameters, if any
  if (!parametersLoaded && profile && staticOptions) {
    getUrlInputs(
      apiKey,
      apiUrl,
      filterFields,
      staticOptions,
      profile,
      getSignal(),
    )
      .then(({ filters, errors }) => {
        initializeFilters(filters);
        if (errors.invalid.size || errors.duplicate.size)
          setParameterErrors(errors);
      })
      .catch((err) => {
        console.error(`Error loading initial inputs: ${err}`);
      })
      .finally(() => {
        setParametersLoaded(true);
        scrollToHash();
      });
  }

  const navigate = useNavigate();

  // Update URL when inputs change
  useEffect(() => {
    if (!parametersLoaded) return;

    navigate(
      '?' + buildUrlQueryString(parameters.filters) + window.location.hash,
      { replace: true },
    );
  }, [navigate, parameters, parametersLoaded]);

  return { queryParams: parameters, queryParamErrors: parameterErrors };
}

function useSourceState(sourceFields: SourceFields) {
  const [sourceState, sourceDispatch] = useReducer(
    createSourceReducer(sourceFields),
    getDefaultSourceState(sourceFields),
  );

  // Memoize individual dispatch functions
  const sourceHandlers = useMemo(() => {
    return Object.values(sourceFields).reduce((handlers, source) => {
      return {
        ...handlers,
        [source.id]: (ev: Option | null) =>
          sourceDispatch({ type: source.id, payload: ev } as SourceFieldAction),
      };
    }, {});
  }, [sourceFields]) as SourceFieldInputHandlers;

  return { sourceState, sourceHandlers };
}

/*
## Utils
*/

// Adds aliases for fields that share the same set of possible values
function addDomainAliases(values: DomainOptions): Required<DomainOptions> {
  return {
    ...values,
    associatedActionAgency: values.actionAgency,
    associatedActionStatus: values.assessmentUnitStatus,
    associatedActionType: values.actionType,
    pollutant: values.parameterName,
  };
}

function buildFilterData(
  filterFields: FilterFields,
  filterState: FilterFieldState,
  profile: Profile,
) {
  const newFilterQueryParams: FilterQueryData = {};
  Object.entries(filterState).forEach(
    ([field, value]: [string, FilterFieldState[keyof FilterFieldState]]) => {
      if (isEmpty(value)) return;
      const fieldConfig = field in filterFields ? filterFields[field] : null;
      if (!fieldConfig) return;

      // Extract 'value' field from Option types
      const flattenedValue = getInputValue(value);
      const formattedValue =
        isDateField(fieldConfig) && typeof flattenedValue === 'string'
          ? fromIsoDateString(flattenedValue)
          : flattenedValue;

      if (formattedValue && isProfileField(fieldConfig, profile)) {
        newFilterQueryParams[field] = formattedValue;
      }
    },
  );
  return newFilterQueryParams;
}

// Converts a JSON object into a parameter string
function buildUrlQueryString(
  filters: FilterQueryData,
  options?: OptionQueryData,
  columns?: string[],
) {
  const paramsList: UrlQueryParam[] = [];
  columns?.forEach((column) => paramsList.push(['columns', column]));
  Object.entries({ ...filters, ...options }).forEach(([field, value]) => {
    // Duplicate the query parameter for an array of values
    if (Array.isArray(value))
      (value as string[]).forEach((v) => paramsList.push([field, v]));
    // Else push a single parameter
    else paramsList.push([field, value]);
  });
  return encodeURI(
    paramsList.reduce((a, b) => a + `&${b[0]}=${b[1]}`, '').replace('&', ''),
  ); // trim the leading ampersand
}

function camelToKebab(camel: string) {
  return camel
    .split('')
    .map((letter) => {
      return letter === letter.toUpperCase()
        ? '-' + letter.toLowerCase()
        : letter;
    })
    .join('');
}

// Returns a boolean, specifying if a value is found in the
// specified table and column of the database
async function checkColumnValue(
  apiKey: string,
  apiUrl: string,
  value: string,
  fieldName: string,
  profile: string,
) {
  const url = `${apiUrl}/${profile}/values/${fieldName}?${fieldName}=${value}&limit=1`;
  const res = await getData<string[]>({ url, apiKey });
  if (res.length) return true;
  return false;
}

// Creates a reducer to manage the state of all query field inputs
function createFilterReducer(filterFields: FilterFields) {
  const handlers: FilterFieldActionHandlers = {};
  for (const field in getDefaultFilterState(filterFields)) {
    handlers[field] = (state, action) => {
      if (!('payload' in action)) return state;
      return { ...state, [action.type]: action.payload };
    };
  }
  return function reducer(state: FilterFieldState, action: FilterFieldsAction) {
    if (action.type === 'initialize') {
      return action.payload as FilterFieldState;
    } else if (action.type === 'reset') {
      return getDefaultFilterState(filterFields);
    } else if (handlers.hasOwnProperty(action.type)) {
      return (
        handlers[action.type]?.(state, action as FilterFieldAction) ?? state
      );
    } else {
      const message = `Unhandled action type: ${action}`;
      throw new Error(message);
    }
  };
}

function createSourceReducer(sourceFields: SourceFields) {
  const actionHandlers = Object.values(sourceFields).reduce(
    (current, field) => {
      return {
        ...current,
        [field.id]: (state: SourceFieldState, action: SourceFieldAction) => {
          return {
            ...state,
            [field.id]: action.payload,
          };
        },
      };
    },
    {},
  ) as SourceFieldActionHandlers;

  return function reducer(state: SourceFieldState, action: SourceFieldAction) {
    if (actionHandlers.hasOwnProperty(action.type)) {
      return actionHandlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

// Filters options that require fetching values from the database
function filterDynamicOptions({
  apiKey,
  apiUrl,
  defaultOption,
  direction = 'asc',
  fieldName,
  filters,
  limit = 20,
  profile,
  secondaryFieldName,
}: {
  apiKey: string;
  apiUrl: string;
  defaultOption?: Option | null;
  direction?: SortDirection;
  fieldName: string;
  filters?: FilterQueryData;
  limit?: number;
  profile: string;
  secondaryFieldName?: string | null;
}) {
  return async function (
    inputValue: string,
    signal?: AbortSignal,
  ): Promise<Array<Option>> {
    const url = `${apiUrl}/${profile}/values/${fieldName}`;
    const data = {
      text: inputValue,
      direction: direction ?? null,
      limit,
      filters,
      additionalColumns: secondaryFieldName ? [secondaryFieldName] : [],
    };
    const values = await postData({
      url,
      apiKey,
      data,
      responseType: 'json',
      signal,
    });
    const options = values.map((item: Record<string, string>) => {
      const value = item[fieldName];
      // Concatenate primary column value with secondary, if present
      const secondaryValue = secondaryFieldName
        ? item[secondaryFieldName]
        : null;
      const label = secondaryValue ? secondaryValue : value;
      return { label, value };
    });
    return defaultOption ? [defaultOption, ...options] : options;
  };
}

// Filters options by search input, returning a maximum number of options
function filterOptions({
  apiKey,
  apiUrl,
  defaultOption,
  dynamicOptionLimit,
  fieldName,
  filters = {},
  profile,
  direction = 'asc',
  staticOptions,
  secondaryFieldName,
}: {
  apiKey: string;
  apiUrl: string;
  defaultOption?: Option | null;
  dynamicOptionLimit?: number;
  fieldName: string;
  filters?: FilterQueryData;
  profile: string;
  direction?: SortDirection;
  secondaryFieldName?: string | null;
  staticOptions: StaticOptions;
}) {
  if (!Object.keys(filters).length && staticOptions.hasOwnProperty(fieldName)) {
    return filterStaticOptions(
      staticOptions[fieldName as keyof StaticOptions] ?? [],
      defaultOption,
    );
  } else {
    return filterDynamicOptions({
      apiKey,
      apiUrl,
      defaultOption,
      direction,
      fieldName,
      filters,
      limit: dynamicOptionLimit,
      profile,
      secondaryFieldName,
    });
  }
}

// Filters options that have values held in memory
function filterStaticOptions(
  options: ReadonlyArray<Option>,
  defaultOption?: Option | null,
) {
  return function (inputValue: string) {
    const value = inputValue.trim().toLowerCase();
    const matches: Option[] = [];
    options.every((option) => {
      if (matches.length >= staticOptionLimit) return false;
      if (
        (typeof option.label === 'string' &&
          option.label.toLowerCase().includes(value)) ||
        (typeof option.value === 'string' &&
          option.value.toLowerCase().includes(value))
      ) {
        matches.push(option);
      }
      return true;
    });
    return Promise.resolve(
      defaultOption ? [defaultOption, ...matches] : matches,
    );
  };
}

// Convert `yyyy-mm-dd` date format to `mm-dd-yyyy`
function fromIsoDateString(dateString: string) {
  const date = new Date(dateString);
  return `${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date
    .getUTCDate()
    .toString()
    .padStart(2, '0')}-${date.getUTCFullYear().toString().padStart(4, '0')}`;
}

// Utility function to choose between 'a' or 'an'
function getArticle(noun: string) {
  if (!noun.length) return '';
  const aExceptions = ['use'];
  if (aExceptions.includes(noun.toLowerCase())) return 'a';
  if (['a', 'e', 'i', 'o', 'u'].includes(noun.charAt(0).toLowerCase())) {
    return 'an';
  }
  return 'a';
}

function getContextFilters(
  fieldConfig: FilterField,
  fieldConfigs: Array<FilterField | SourceField>,
  profile: Profile,
  filters: FilterQueryData,
) {
  if (!('contextFields' in fieldConfig)) return;

  return Object.entries(filters).reduce<FilterQueryData>(
    (current, [key, value]) => {
      const filterFieldConfig = fieldConfigs.find((f) => f.key === key);
      if (
        filterFieldConfig &&
        isProfileField(filterFieldConfig, profile) &&
        (fieldConfig.contextFields as readonly string[]).includes(key)
      ) {
        return {
          ...current,
          [key]: value,
        };
      }
      return current;
    },
    {},
  );
}

// Returns the default state for inputs
function getDefaultFilterState(filterFields: FilterFields) {
  return Object.values(filterFields).reduce((a, b) => {
    const defaultValue = getDefaultValue(b);
    const defaultState =
      defaultValue && isMultiOptionField(b) ? [defaultValue] : defaultValue;
    return { ...a, [b.key]: defaultState };
  }, {}) as FilterFieldState;
}

function getDefaultSourceState(sourceFields: SourceFields) {
  return Object.values(sourceFields).reduce((sourceState, field) => {
    return {
      ...sourceState,
      [field.key]: getDefaultValue(field),
    };
  }, {}) as SourceFieldState;
}

function getDefaultValue(field: FilterField | SourceField) {
  const defaultValue = 'default' in field ? field.default : null;
  return defaultValue ?? (isSingleValueField(field) ? '' : null);
}

// Returns unfiltered options for a field, up to a maximum length
function getInitialOptions(staticOptions: StaticOptions, fieldName: string) {
  if (staticOptions.hasOwnProperty(fieldName)) {
    const fieldOptions = staticOptions[fieldName as keyof StaticOptions] ?? [];

    return fieldOptions.length > staticOptionLimit
      ? fieldOptions.slice(0, staticOptionLimit)
      : fieldOptions;
  }
  return null;
}

// Extracts the value field from Option items, otherwise returns the item
function getInputValue(input: Option | ReadonlyArray<Option> | string) {
  if (Array.isArray(input)) {
    return input.map((v) => {
      if (isOption(v)) return v.value;
      return v;
    });
  }
  if (isOption(input)) return input.value;
  return input;
}

function removeNulls<T>(fields: Array<T | null>) {
  return fields.reduce<Array<T>>((a, b) => {
    if (isNotEmpty(b)) {
      a.push(b);
    }
    return a;
  }, []);
}

function getStaticOptions(fieldName: string, staticOptions: StaticOptions) {
  return staticOptions.hasOwnProperty(fieldName)
    ? staticOptions[fieldName as keyof StaticOptions] ?? []
    : null;
}

// Uses URL route/query parameters or default values for initial state
async function getUrlInputs(
  apiKey: string,
  apiUrl: string,
  filterFields: FilterFields,
  staticOptions: StaticOptions,
  profile: Profile,
  _signal: AbortSignal,
): Promise<{ filters: FilterFieldState; errors: ParameterErrors }> {
  const [params, errors] = parseInitialParams(profile, filterFields);

  const newState = getDefaultFilterState(filterFields);

  // Match query parameters
  await Promise.all([
    ...Object.keys(params).map(async (key) => {
      const filterField = key in filterFields ? filterFields[key] : null;
      if (!filterField) return;
      if (isMultiOptionField(filterField)) {
        newState[key] = await matchMultipleOptions(
          apiKey,
          apiUrl,
          params[key] ?? null,
          filterField,
          getStaticOptions(key, staticOptions),
          profile.key,
        );
      } else if (isSingleOptionField(filterField)) {
        newState[key] = await matchSingleOption(
          apiKey,
          apiUrl,
          params[key] ?? null,
          filterField,
          getStaticOptions(key, staticOptions),
          profile.key,
        );
      } else if (isDateField(filterField)) {
        newState[key] = matchDate(params[key] ?? null);
      } else if (isYearField(filterField)) {
        newState[key] = matchYear(params[key] ?? null);
      }
    }),
  ]);

  return { filters: newState, errors };
}

// Type narrowing
function isDateField(field: FilterField) {
  return field.type === 'date';
}

// Utility
function isEmpty<T>(
  v: T | null | undefined | [] | {},
): v is null | undefined | [] | {} {
  return !isNotEmpty(v);
}

// Type narrowing
function isMultiOptionField(field: FilterField): field is MultiOptionField {
  return field.type === 'multiselect';
}

// Type predicate, negation is used to narrow to type `T`
function isNotEmpty<T>(v: T | null | undefined | [] | {}): v is T {
  if (v === null || v === undefined || v === '') return false;
  if (Array.isArray(v) && v.length === 0) return false;
  else if (
    Object.keys(v).length === 0 &&
    Object.getPrototypeOf(v) === Object.prototype
  ) {
    return false;
  }
  return true;
}

// Type narrowing
function isOption(maybeOption: Option | string): maybeOption is Option {
  return typeof maybeOption === 'object' && 'value' in maybeOption;
}

function isProfileField(field: FilterField, profile: Profile) {
  const profileColumns = profile.columns;
  if (profileColumns.has(field.key)) return true;
  if ('domain' in field && profileColumns.has(field.domain as string))
    return true;
  return false;
}

// Type narrowing
function isSingleOptionField(field: FilterField): field is SingleOptionField {
  return field.type === 'select';
}

// Type narrowing
function isSingleValueField(field: FilterField): field is SingleValueField {
  return field.type === 'date' || field.type === 'year';
}

// Type narrowing
function isYearField(field: FilterField) {
  return field.type === 'year';
}

// Verify that a given string matches a parseable date format
function matchDate(values: InputValue, yearOnly = false) {
  const value = Array.isArray(values) ? values[0] : values;
  if (!value) return '';
  const date = new Date(value.toString());
  if (isNaN(date.getTime())) return '';
  const dateString = date.toISOString();
  const endIndex = yearOnly ? 4 : 10;
  return dateString.substring(0, endIndex);
}

// Wrapper function to add type assertion
async function matchMultipleOptions(
  apiKey: string,
  apiUrl: string,
  values: InputValue,
  field: FilterField | SourceField,
  options: ReadonlyArray<Option> | null = null,
  profile: string | null = null,
) {
  return (await matchOptions(
    apiKey,
    apiUrl,
    values,
    field,
    options,
    profile,
    true,
  )) as ReadonlyArray<Option>;
}

// Wrapper function to add type assertion
async function matchSingleOption(
  apiKey: string,
  apiUrl: string,
  values: InputValue,
  field: FilterField | SourceField,
  options: ReadonlyArray<Option> | null = null,
  profile: string | null = null,
) {
  return (await matchOptions(
    apiKey,
    apiUrl,
    values,
    field,
    options,
    profile,
  )) as Option | null;
}

// Produce the option/s corresponding to a particular value
async function matchOptions(
  apiKey: string,
  apiUrl: string,
  values: InputValue,
  field: FilterField | SourceField,
  options: ReadonlyArray<Option> | null = null,
  profile: string | null = null,
  multiple = false,
) {
  const valuesArray: string[] = [];
  if (Array.isArray(values)) valuesArray.push(...values);
  else if (values !== null) valuesArray.push(values);

  const matches = new Set<Option>(); // prevent duplicates
  // Check if the value is valid, otherwise use a default value
  await Promise.all(
    valuesArray.map(async (value) => {
      if (options) {
        const match = options.find((option) => option.value === value);
        if (match) matches.add(match);
      } else if (profile) {
        const isValid = await checkColumnValue(
          apiKey,
          apiUrl,
          value,
          field.key,
          profile,
        );
        if (isValid) matches.add({ label: value, value });
      }
    }),
  );

  if (matches.size === 0) {
    const defaultOption = getDefaultValue(field);
    defaultOption && matches.add(defaultOption);
  }

  const matchesArray = Array.from(matches);
  return multiple ? matchesArray : matchesArray.pop() ?? null;
}

function matchYear(values: InputValue) {
  return matchDate(values, true);
}

// Parse parameters provided in the URL search into a JSON object
function parseInitialParams(
  profile: Profile,
  filterFields: FilterFields,
): [FilterQueryData, ParameterErrors] {
  const uniqueParams: { [field: string]: string | Set<string> } = {};
  const paramErrors: ParameterErrors = {
    duplicate: new Set(),
    invalid: new Set(),
  };

  Array.from(new URLSearchParams(window.location.search)).forEach(
    ([field, uriValue]) => {
      // Disregard empty parameters
      if (!uriValue) return;

      const newValue = decodeURI(uriValue);

      const fieldConfig = field in filterFields ? filterFields[field] : null;
      if (!fieldConfig) {
        paramErrors.invalid.add(field);
        return;
      }

      if (field in uniqueParams) {
        if (!isMultiOptionField(fieldConfig))
          return paramErrors.duplicate.add(field);
        // Multiple values, add to an array
        const value = uniqueParams[field];
        if (value instanceof Set) value.add(newValue);
        else uniqueParams[field] = new Set([value, newValue]);
      } else {
        if (!isProfileField(fieldConfig, profile)) {
          paramErrors.invalid.add(field);
          return;
        }
        // Single value
        uniqueParams[field] = newValue;
      }
    },
  );

  const params = Object.entries(uniqueParams).reduce(
    (current, [param, value]) => {
      return {
        ...current,
        [param]: value instanceof Set ? Array.from(value) : value,
      };
    },
    {},
  );

  return [params, paramErrors];
}

function scrollToHash() {
  const hash = window.location.hash.slice(1);
  if (!hash) return;

  const hashTag = document.getElementById(hash);
  hashTag?.scrollIntoView({ behavior: 'smooth' });
}

/*
## Constants
*/

const staticOptionLimit = 100;

/*
## Types
*/

type FilterField = FilterFields[string];

type FilterFieldActionHandlers = {
  [field: string]: (
    state: FilterFieldState,
    action: FilterFieldAction,
  ) => FilterFieldState;
};

type FilterFieldsAction =
  | FilterFieldAction
  | { type: 'initialize'; payload: FilterFieldState }
  | { type: 'reset' };

type FilterFields = Content['filterConfig']['filterFields'];

type FilterFieldAction = {
  type: string;
  payload: FilterFieldState[string];
};

type FilterFieldInputHandlers = {
  [field: string]: OptionInputHandler | SingleValueInputHandler;
};

type FilterFieldInputsProps = Omit<
  FilterFieldGroupsProps,
  'filterGroupLabels' | 'filterGroups'
> & {
  fields: FilterField[];
};

type FilterFieldState = {
  [field: string]: MultiOptionState | SingleOptionState | string;
};

type FilterFieldGroupsProps = {
  apiKey: string;
  apiUrl: string;
  filterFields: FilterFields;
  filterGroupLabels: FilterGroupLabels;
  filterGroups: FilterGroup[];
  filterHandlers: FilterFieldInputHandlers;
  filterState: FilterFieldState;
  profile: Profile;
  queryParams: QueryData;
  sourceFields: SourceFields;
  sourceHandlers: SourceFieldInputHandlers;
  sourceState: SourceFieldState;
  staticOptions: StaticOptions;
};

type FilterGroup = Content['filterConfig']['filterGroups'][string][number];

type FilterGroupLabels = Content['filterConfig']['filterGroupLabels'];

type FilterQueryData = {
  [field: string]: string | string[];
};

type HomeContext = {
  filterFields: FilterFields;
  filterGroups: FilterGroup[];
  filterGroupLabels: FilterGroupLabels;
  filterHandlers: FilterFieldInputHandlers;
  filterState: FilterFieldState;
  format: Option;
  formatHandler: (format: Option) => void;
  profile: Profile;
  queryParams: QueryData;
  queryUrl: string;
  resetFilters: () => void;
  sourceFields: SourceFields;
  sourceHandlers: SourceFieldInputHandlers;
  sourceState: SourceFieldState;
  staticOptions: StaticOptions;
};

type InputValue = string | string[] | null;

type MultiOptionState = ReadonlyArray<Option> | null;

type OptionInputHandler = (
  option: SingleOptionState | MultiOptionState,
) => void;

type OptionQueryData = Partial<{
  format: string;
}>;

type ParameterErrors = {
  duplicate: Set<string>;
  invalid: Set<string>;
};

type Profile = Profiles[string];

type Profiles = Content['profileConfig'];

type QueryData = {
  columns: string[];
  filters: FilterQueryData;
  options: OptionQueryData;
};

type RangeFilterProps = {
  domain: string;
  highHandler: SingleValueInputHandler;
  highKey: string;
  highValue: string;
  label: string;
  lowHandler: SingleValueInputHandler;
  lowKey: string;
  lowValue: string;
  type: 'date' | 'year';
};

type SelectFilterProps = {
  apiKey: string;
  apiUrl: string;
  contextFilters: FilterQueryData;
  defaultOption?: Option | null;
  filterHandler: Exclude<
    FilterFieldInputHandlers[string],
    SingleValueInputHandler
  >;
  filterKey: string;
  filterLabel: string;
  filterValue: MultiOptionState | SingleOptionState;
  isMulti?: boolean;
  placeholder?: string | null;
  profile: Profile;
  secondaryFilterKey: string;
  sortDirection?: SortDirection;
  sourceKey: string | null;
  sourceValue: SourceFieldState[string] | null;
  staticOptions: StaticOptions;
};

type SingleOptionInputHandler = (ev: SingleOptionState) => void;

type SingleOptionState = Option | null;

type SingleValueInputHandler = (ev: ChangeEvent<HTMLInputElement>) => void;

type SortDirection = 'asc' | 'desc';

type SourceField = SourceFields[string];

type SourceFields = Content['filterConfig']['sourceFields'];

type SourceFieldState = {
  [field: string]: SingleOptionState;
};

type SourceFieldAction = {
  type: string;
  payload: SourceFieldState[string];
};

type SourceFieldActionHandlers = {
  [field: string]: (
    state: SourceFieldState,
    action: SourceFieldAction,
  ) => SourceFieldState;
};

type SourceFieldInputHandlers = {
  [field: string]: SingleOptionInputHandler;
};

type SourceSelectFilterProps = SelectFilterProps & {
  sourceHandler: SourceFieldInputHandlers[string];
  sourceKey: string;
  sourceLabel: string;
};

type UrlQueryParam = [string, string];
