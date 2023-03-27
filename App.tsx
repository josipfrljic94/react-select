import classNames = require('classnames');
import * as React from 'react';
import { useOnClickOutside } from './hooks';
import './style.scss';

export default function App() {
  const [isActive, setIsActive] = React.useState(false);
  const ref = React.useRef();
  const inputRef = React.useRef();
  useOnClickOutside(ref, onUBlur);
  const [val, setVal] = React.useState('');
  const cls = classNames('drop-down', {
    active: isActive,
  });

  function toggleOpenDrawer() {
    if (
      isActive ||
      !inputRef?.current ||
      !inputRef?.current === document.activeElement
    )
      return setIsActive(false);
    setIsActive(true);
    inputRef?.current?.focus();
  }
  function onUBlur() {
    setIsActive(false);
    if (!inputRef?.current) return;
    inputRef?.current?.blur();
  }

  const inputCls = classNames('custom-input', {
    active: isActive,
  });

  async function onSubmit() {
    await fetch('https://x-board-dev.fly.dev/dashboards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: 'Prvi dashboard',
        owner_id: 'user_1',
        devices: ['123'],
      }),
    });
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isActive) {
      event.preventDefault();
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="text" name="name" />
        </div>
        <div className="select-wrap">
          {/* <h1>{val}</h1> */}
          <img
            className="img"
            src="https://www.svgrepo.com/show/80156/down-arrow.svg"
            alt=""
          />
          <label ref={ref} className="pure-material-textfield-outlined">
            <input
              placeholder={!val ? ' ' : null}
              onClick={toggleOpenDrawer}
              ref={inputRef}
              onKeyDown={handleKeyDown}
              value={val}
              // disabled
              className={inputCls}
            />
            <span>Text</span>
            <div className={cls}>
              <ul>
                <li onClick={() => setVal('')}>None</li>
                <li onClick={() => setVal('Item 1')}>Item1</li>
                <li onClick={() => setVal('Item 2')}>Item2</li>
                <li onClick={() => setVal('Item 3')}>Item3</li>
              </ul>
            </div>
          </label>
        </div>
      </form>
    </div>
  );
}
