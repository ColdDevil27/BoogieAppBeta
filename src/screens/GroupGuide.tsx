import type { Group, GroupItem } from '../types';
import { medication } from '../data';
import Topbar from '../components/Topbar';
import { IconChevronRight, IconWarn } from '../components/Icons';

function Row({ item }: { item: GroupItem }) {
  const pill = (
    <span className={`pill ${item.severity}`}>{item.severity === 'avoid' ? 'Avoid' : 'Ask first'}</span>
  );
  const body = (
    <>
      <div className="grow">
        <div className="steptitle">{item.name}</div>
        <div className="muted small">{item.examples}</div>
      </div>
      {pill}
    </>
  );
  return (
    <li>
      {item.entryId ? (
        <a className="row" href={`#/check/${item.entryId}`}>
          {body}
          <IconChevronRight stroke="#5A5F7A" />
        </a>
      ) : (
        <div className="row">{body}</div>
      )}
    </li>
  );
}

export default function GroupGuide({ group }: { group: Group }) {
  const avoid = group.items.filter((i) => i.severity === 'avoid');
  const ask = group.items.filter((i) => i.severity === 'caution');

  return (
    <>
      <Topbar />
      <div className="page">
        <div>
          <div className="eyebrow-sm">{medication.brandName} safety guide</div>
          <h1 className="title">{group.title}</h1>
          <div className="muted">What it is and what can trigger it</div>
        </div>

        <section className="ink">
          <h2>WHAT IT IS</h2>
          <p>{group.whatItIs}</p>
        </section>

        <section className="signs avoid">
          <h2>Early signs</h2>
          <ul>
            {group.earlySigns.map((s) => (
              <li key={s}>
                <span className="dot" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </section>

        <section className="emergency">
          <span className="emergencyicon">
            <IconWarn width={20} height={20} stroke="#fff" />
          </span>
          <div>
            <h2>{group.emergency.title}</h2>
            <p className="muted">{group.emergency.body}</p>
          </div>
        </section>

        <section className="card list">
          <div className="listhead avoid">
            <h2>Avoid combining</h2>
            <p className="muted small">Unless your prescriber says it's OK.</p>
          </div>
          <ul>
            {avoid.map((i) => (
              <Row key={i.name} item={i} />
            ))}
          </ul>
        </section>

        <section className="card list">
          <div className="listhead caution">
            <h2>Ask first</h2>
            <p className="muted small">Sometimes used together, with a doctor watching.</p>
          </div>
          <ul>
            {ask.map((i) => (
              <Row key={i.name} item={i} />
            ))}
          </ul>
        </section>

        <footer className="footer">
          <p>
            These examples aren't a complete list. Tell every prescriber and pharmacist you take{' '}
            {medication.brandName}. Information only, not medical advice.
          </p>
        </footer>
      </div>
    </>
  );
}
