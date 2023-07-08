export const filterItem = ({ id, list }) => {
  const itemToRemove = list.find((n) => n.id === id)
  const listWithoutItem = [...list.filter((n) => n !== itemToRemove)]
  return listWithoutItem
}

export const enrichNodesWithLink = ({ connection, nodes }) => {
  const { source, target } = connection
  const node = nodes.find((n) => n.id === source.id)
  const links = node.links || []

  const nodesUpdated = filterItem({ id: source.id, list: nodes }).concat({
    ...node,
    links: [...links, target.id],
  })
  return [...nodesUpdated]
}

export const enrichNodesWithLinks = ({ connections, nodes }) => {
  const workingNodes = connections.reduce((nodes, connection) => {
    return enrichNodesWithLink({ connection, nodes })
  }, nodes)

  return workingNodes
}
