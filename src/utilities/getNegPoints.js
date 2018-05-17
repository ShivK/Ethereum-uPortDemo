import InsContract from '../utilities/InsContract'


async function getNegPoints (addr, actions) {
  console.log("getNegPoints Start");
  actions.getPointsREQUEST()
  InsContract.getNegPoints
    .call(addr, (error, pointsP) => {
      if (error) {
        actions.getPointsERROR(error)
        throw error
      }
      const negPoints = pointsP.toNumber()
      actions.getNegPointsSUCCESS(negPoints)
      console.log("getNegPoints result - negPoints=",negPoints);
      return negPoints
    })
}

export default getNegPoints