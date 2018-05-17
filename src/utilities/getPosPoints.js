import InsContract from '../utilities/InsContract'


async function getPosPoints (addr, actions) {
  console.log("getPosPoints Start");
  actions.getPointsREQUEST()
  InsContract.getPosPoints
    .call(addr, (error, pointsP) => {
      if (error) {
        actions.getPointsERROR(error)
        throw error
      }
      const posPoints = pointsP.toNumber()
      actions.getPosPointsSUCCESS(posPoints)
      console.log("getPosPoints result - posPoints=",posPoints);
      return posPoints
    })
}



export default getPosPoints
