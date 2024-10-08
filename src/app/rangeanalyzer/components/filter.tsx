import React, { ChangeEvent, MouseEventHandler } from 'react';
type Filter = {
  settings: {
    frequency: number;
    type: BiquadFilterType;
    Q?: number;
  },
  change:(e:ChangeEvent<HTMLInputElement>) => void,
  changeType:MouseEventHandler<HTMLButtonElement>
}
const Filter = ({ change, settings, changeType }: Filter) => {
  const { frequency, type, Q } = settings;
  return (
    <div className='control'>
      <h2>filter</h2>
      <div className='params'>
        <h3>frequency</h3>
        <input
          value={frequency}
          type='range'
          onChange={change}
          id='frequency'
          max='20000'
        />
      </div>
      <div className='params'>
        <h3>Q</h3>
        <input
          value={Q}
          type='range'
          onChange={change}
          id='Q'
          max='10'
          step={0.1}
        />
      </div>
      <div className='param'>
        <h2>{'Filter Frequency'}</h2>
        <h3>{settings.frequency}</h3>
      </div>
      <div className='param'>
        <h2>{'Filter Q'}</h2>
        <h3>{settings.Q}</h3>
      </div>
      <div className='param'>
        <h2>type</h2>
        <button
          onClick={changeType}
          id='lowpass'
          className={`${type === 'lowpass' && 'active'}`}
        >
          lowpass
        </button>
        <button
          onClick={changeType}
          id='highpass'
          className={`${type === 'highpass' && 'active'}`}
        >
          highpass
        </button>
        <button
          onClick={changeType}
          id='notch'
          className={`${type === 'notch' && 'active'}`}
        >
          notch
        </button>
        <button
          onClick={changeType}
          id='lowshelf'
          className={`${type === 'lowshelf' && 'active'}`}
        >
          lowshelf
        </button>
        <button
          onClick={changeType}
          id='highshelf'
          className={`${type === 'highshelf' && 'active'}`}
        >
          highshelf
        </button>
        <button
          onClick={changeType}
          id='bandpass'
          className={`${type === 'bandpass' && 'active'}`}
        >
          bandpass
        </button>
        {/* <button
          onClick={changeType}
          id='bandpass'
          className={`${type === 'bandpass' && 'active'}`}
        >
          bandpass
        </button> */}
      </div>
    </div>
  );
};

export default Filter;