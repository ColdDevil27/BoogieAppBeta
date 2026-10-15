import { useEffect, useState } from 'react';
import { getEntry, getGroup } from './data';
import Home from './screens/Home';
import Result from './screens/Result';
import NoMatch from './screens/NoMatch';
import GroupGuide from './screens/GroupGuide';

function useHash() {
  const [hash, setHash] = useState(window.location.hash || '#/');
  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHash();
  const [path, search = ''] = hash.slice(1).split('?');
  const parts = path.split('/').filter(Boolean);
  const params = new URLSearchParams(search);

  let screen = <Home />;

  if (parts[0] === 'check' && parts[1]) {
    const entry = getEntry(parts[1]);
    screen = entry ? <Result entry={entry} /> : <NoMatch query={parts[1]} />;
  } else if (parts[0] === 'guide' && parts[1]) {
    const group = getGroup(parts[1]);
    screen = group ? <GroupGuide group={group} /> : <Home />;
  } else if (parts[0] === 'not-found') {
    screen = <NoMatch query={params.get('q') ?? ''} />;
  }

  return <div className="app">{screen}</div>;
}
