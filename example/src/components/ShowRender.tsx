import * as React from 'react';

const timers: Record<string, NodeJS.Timeout> = {};

function showManager(id: string) {
  clearTimeout(timers[id]);
  const elem = document.getElementById(id);
  elem?.classList.add('visible');
  timers[id] = setTimeout(() => {
    elem?.classList.remove('visible');
  }, 3000);
}

function getUid() {
  return `a${crypto.randomUUID()}`;
}

export function ShowRender() {
  const uid = React.useRef(getUid());
  React.useEffect(() => {
    showManager(uid.current);
  });

  return (
    <div id={uid.current} className="render">
      Rendered
    </div>
  );
}
