```typescript
"use client";
import { useThemeContext } from "./ThemeContext";
import { themeNames, ThemeVariant } from "./theme";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function ThemeDropdown() {
  const { currentTheme, setTheme } = useThemeContext();

  return (
    <FormControl size="small" sx={{ m: 2, minWidth: 120 }}>
      <InputLabel>Theme</InputLabel>
      <Select
        value={currentTheme}
        label="Theme"
        onChange={(e) => setTheme(e.target.value as ThemeVariant)}
      >
        {themeNames.map((name) => (
          <MenuItem key={name} value={name}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
```
