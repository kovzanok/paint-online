import "../style/SettingsBar.scss";

export default function SettingsBar() {
  return (
    <div className="settingsbar">
      <ul className="settingsbar__list">
        <li>
          <label className="settingsbar__label">
            Line weight:
            <input min={1} max={50} defaultValue={1} type='number' />
          </label>
        </li>
        <li>
          <label className="settingsbar__label">
            Stroke color:
            <input type='color' />
          </label>
        </li>
      </ul>
    </div>
  );
}
