type IconProps = {
  color: string;
};

type FigureIconProps = {
  stroke: string;
} & IconProps;

type ToolParams = {
  canvas: HTMLCanvasElement | null;
} & SettingsState;

type SettingsState = {
  color: string;
  stroke: string;
  weight: number;
};
