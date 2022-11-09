import { uniqueId } from 'lodash';
// types
import type { ReactNode } from 'react';

interface Option {
  label: ReactNode;
  value: string;
}

type Props = {
  legend?: ReactNode;
  onChange: (selected: Option) => void;
  options: Option[];
  selected?: Option | null;
  styles?: string[];
  tile?: boolean;
};

export default function RadioButtons({
  legend,
  onChange,
  options,
  selected = null,
  styles = [],
  tile = false,
}: Props) {
  return (
    <fieldset className={`usa-fieldset ${styles.join(' ')}`}>
      {legend && <legend className="usa-legend">{legend}</legend>}
      {options.map((option) => {
        const id = uniqueId('radio-');
        return (
          <div key={id} className="usa-radio">
            <input
              className={`usa-radio__input ${tile && 'usa-radio__input--tile'}`}
              id={id}
              type="radio"
              value={option.value}
              checked={option.value === selected?.value}
              onChange={(_ev) => onChange(option)}
            />
            <label className="usa-radio__label" htmlFor={id}>
              {option.label}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}
