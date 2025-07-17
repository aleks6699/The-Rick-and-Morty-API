import { useTheme, useThemeActions } from '../../hooks/useThemeHooks';
import style from './toggleTheme.module.css';

const PARTICLE_ANGLES = [30, 60, 90, 120, 150, 180] as const;

export const ToggleTheme = () => {
  const theme = useTheme();
  const toggleTheme = useThemeActions();
  const isDarkTheme = theme === 'light';

  return (
    <label
      className={style['cosmic-toggle']}
      role="switch"
      aria-checked={isDarkTheme}
      aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
    >
      <input
        className={style.toggle}
        type="checkbox"
        checked={isDarkTheme}
        onChange={toggleTheme}
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className={style.slider}>
        <div className={style.cosmos} />

        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className={style['energy-line']} />
        ))}

        <div className={style['toggle-orb']}>
          <div className={style['inner-orb']} />
          <div className={style.ring} />
        </div>

        <div className={style.particles}>
          {PARTICLE_ANGLES.map((angle) => {
            const angleClass = `angle${angle}`;
            return (
              <div
                key={angle}
                className={[style.particle, style[angleClass]].join(' ')}
              />
            );
          })}
        </div>
      </div>

      <span className="sr-only">
        {isDarkTheme ? 'Dark theme is active' : 'Light theme is active'}
      </span>
    </label>
  );
};
