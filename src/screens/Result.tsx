import type { ComponentType, SVGProps } from 'react';
import type { Entry, Severity } from '../types';
import { medication } from '../data';
import Topbar from '../components/Topbar';
import { IconCheck, IconWarn, IconX } from '../components/Icons';

const VERDICTS: Record<Severity, { label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }> = {
  avoid: { label: 'AVOID', Icon: IconX },
  caution: { label: 'CAUTION', Icon: IconWarn },
  low: { label: 'LOW CONCERN', Icon: IconCheck },
};

export default function Result({ entry }: { entry: Entry }) {
  const { label, Icon } = VERDICTS[entry.severity];

  return (
    <>
      <Topbar />
      <div className="page">
        <div>
          <div className="eyebrow-sm">{medication.brandName} with</div>
          <h1 className="title">{entry.name}</h1>
          <div className="muted">{entry.blurb}</div>
        </div>

        <section className={`verdict ${entry.severity}`}>
          <div className="verdicthead">
            <span className="verdictbadge">
              <Icon />
            </span>
            <span className="verdictlabel">{label}</span>
          </div>
          <h2>{entry.headline}</h2>
          <p>{entry.summary}</p>
        </section>

        <section className={`signs ${entry.severity}`}>
          <h2>{entry.signsLabel}</h2>
          <ul>
            {entry.signs.map((s) => (
              <li key={s}>
                <span className="dot" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="label">What to do</h2>
          <ol className="steps">
            {entry.steps.map((s, i) => (
              <li key={s.title}>
                <span className="stepnum" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <div className="steptitle">{s.title}</div>
                  <div className="muted">{s.body}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <footer className="footer">
          {entry.note && <p>{entry.note}</p>}
          {entry.status === 'draft' && <p>Draft entry: not yet checked against a source.</p>}
          {entry.sources.length > 0 && (
            <p>
              Sources:{' '}
              {entry.sources.map((s, i) => (
                <span key={s.title}>
                  {i > 0 && '; '}
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noreferrer">
                      {s.title}
                    </a>
                  ) : (
                    s.title
                  )}
                </span>
              ))}
            </p>
          )}
          <p>Information only, not medical advice.</p>
        </footer>
      </div>
    </>
  );
}
