const PATH = {
  trace: '/trace',
  view: '/view',
}

const paths = {
  trace: {
    root: `${PATH.trace}`,
    create: `${PATH.trace}/create`,
  },
  view: {
    root: `${PATH.view}`,
    timeline: `${PATH.view}/timeline`,
    heatmap: `${PATH.view}/heatmap`,
    calendar: `${PATH.view}/calendar`,
  },
}

export default paths
