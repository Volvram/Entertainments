import React from 'react';

import Switch from '@mui/material/Switch';

type SwitcherProps = {
  checked?: boolean;
  onChange?: (value?: boolean) => void;
};
const Switcher: React.FC<SwitcherProps> = ({ checked = false, onChange }) => {
  const [_checked, setChecked] = React.useState(checked);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange?.(event.target.checked);
  };

  return <Switch checked={_checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />;
};

export default Switcher;
