
/**
 * @param {number} N
 * @param {number[]} H
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
function getMinExpectedHorizontalTravelDistance(N, H, A, B) {
  // Write your code here
  class Conveyor{
    constructor(height, left, right){
      this.height = height;
      this.left = this.startLeft = left;
      this.right = this.startRight = right;
      this.isRoot = false;
      this.leftConveyor = this.rightConveyor = null;
      this.totalLeftWeight = this.totalRightWeight = 0.0;
      this.isChosen = false;
      this.isChosenLeft = false;
    }
    
    getRootWeight(){
      this.getRootLeftWeight();
      this.getRootRightWeight();
    }
    
    getTotalWeight(){
      return this.totalLeftWeight + this.totalRightWeight;
    }
    
    getRootProbability(){
      return (this.startRight - this.startLeft)/1000000.0;
    }
    
    getRootRightWeight(){
      var p = this.getRootProbability();
      
      var weight =  p * (((rootSegment.startRight - rootSegment.startLeft) / 2) + rootSegment.startLeft - rootSegment.left);
      return weight;
    }
    
    getRootLeftWeight(){
      var p = this.getRootProbability();
      var weight =  p * (((rootSegment.startRight - rootSegment.startLeft) / 2) + rootSegment.right - rootSegment.startRight);
      return weight;
    }
    
    getLeftWeight(x, p){
      if(this.isRoot)
        return this.getRootLeftWeight();
      
      var weight = (x - this.left) * p;
      
      return weight;
    }
    
    getRightWeight(x,p){
      if(this.isRoot)
        return this.getRootRightWeight();
      var weight = (this.right- x) * p;
      return weight;
    }
    
    getWidth(){return this.startRight-this.startLeft;}
    getCollision(dropHeight, x){
      return this.height < dropHeight && this.left < x && this.right > x;
    }
  }
  
  var conveyors = [];
  for(var i = 0; i < N; i++){
    var conveyor = new Conveyor(H[i], A[i], B[i]);
    conveyors.push(conveyor);
  }
  
  conveyors = conveyors.sort((a,b)=>a.height-b.height);

  var conveyorGroup = {};
  var groupCount = 0;
  for(var i = 0; i < N; i++){
    var conveyor = conveyors[i];
    if(conveyorGroup[conveyor.height] == null){
      conveyorGroup[conveyor.height] = [];
      groupCount++;
    }
    conveyorGroup[conveyor.height].push(conveyor);
  }
  
  var rootSegments = [];
  
  var topGroup = Object.keys(conveyorGroup)[groupCount-1];
  for(var i = 0; i < conveyorGroup[topGroup].length;i++){
    var topConveyor = conveyorGroup[topGroup][i];
    topConveyor.isRoot = true;
    rootSegments.push(topConveyor);
  }
  
  for(var i = 0; i < Object.keys(conveyorGroup).length - 1; i++){
    var groupHeight = Object.keys(conveyorGroup)[i];
    for(var l = 0; l < conveyorGroup[groupHeight].length; l++){
      var bottom = conveyorGroup[groupHeight][l];
    for(var j = i+1; j < Object.keys(conveyorGroup).length;j++){
      var topConveyorGroup = Object.keys(conveyorGroup)[j];
      for(var k = 0; k < conveyorGroup[topConveyorGroup].length;k++){
        var top = conveyorGroup[topConveyorGroup][k];
        if(bottom.height == top.height){
          continue;
        }
        if(bottom.right > top.left){
          bottom.startRight = top.left;
        }
        if(bottom.left > top.right){
          bottom.startLeft = top.right;
        }
      }

      if(bottom.right - bottom.left > 0){
        bottom.isRoot = true;
        rootSegments.push(bottom);
      }
    }
    }
  }

  //var totalConveyorWeight = Array.apply(null, Array(N)).forEach(0);
  
  function findAdjacentBelow(rootNode, isLeft){
    var x = isLeft ? rootNode.left : rootNode.right;
    var y = rootNode.height;
    if(x == null || y == null)
      return null;
    var highest = null;
    for(var i = 0; i < conveyors; i++){
      if(conveyor.height >= y)
        continue;
      if(conveyor.left < x && conveyor.right > x && (highest == null || conveyor.height > highest.height)){
        highest = conveyor;
      }
    }
    
    if(isLeft){
      conveyor.leftConveyor = highest;
    }
    else{
      conveyor.rightConveyor = highest;
    }
    
    return highest;
    //return new Node(highest, findAdjacentBelow(highest.left, highest.height), findAdjacentBelow(highest.right, highest.height));
  }
  
  
  var nodes = [];
  var rootNodes = [];
  for(var i = 0; i < rootSegments.length; i++){
    
    var rootSegment = rootSegments[i];
    //rootSegment.getRootWeight();
    
    var p = rootSegment.getRootProbability();
    getTotalWeights(rootSegment, p, null);
  }
  
  var maxTotalLeftConveyor = null;
  var maxTotalRightConveyor = null;
  for(var i = 0; i < conveyors.length; i++){
    var conveyor = conveyors[i];
    if(!maxTotalLeftConveyor || conveyor.totalLeftWeight > maxTotalLeftConveyor.totalLeftWeight)
      maxTotalLeftConveyor = conveyor;
    if(!maxTotalRightConveyor || conveyor.totalRightWeight > maxTotalRightConveyor.totalRightWeight)
      maxTotalRightConveyor = conveyor;
  }
  
  if(maxTotalLeftConveyor.totalLeftWeight > maxTotalRightConveyor.totalRightWeight){
    maxTotalLeftConveyor.isChosen = true;
    maxTotalLeftConveyor.isChosenLeft = true;
  }
  else{
    maxTotalRightConveyor.isChosen = true;
    maxTotalRightConveyor.isChosenLeft = false;
  }
  
  for(var i = 0; i < conveyors.length; i++){
    var conveyor = conveyors[i];
    conveyor.totalLeftWeight = 0.0;
    conveyor.totalRightWeight = 0.0;
  }
  

  function getTotalWeights(root, p, x){

    root.totalLeftWeight += root.getLeftWeight(p,x);
    var leftConveyor = root.leftConveyor || findAdjacentBelow(root, true);
    if(leftConveyor != null){
      var divisor = 2 - (root.isChosen && root.isChosenLeft);
      root.totalLeftWeight += getTotalWeights(leftConveyor, p/divisor, leftConveyor.left);
    }
    
    root.totalRightWeight += root.getRightWeight(p,x);
    var rightConveyor = root.rightConveyor || findAdjacentBelow(root, false);
    if(rightConveyor != null){
      var divisor = 2 - (root.isChosen && !root.isChosenLeft);
      root.totalRightWeight += getTotalWeights(rightConveyor, p/divisor, rightConveyor.right);
    }
    
     if(root.isChosen){
      if(root.isChosenLeft){
        return root.totalLeftWeight;
      }
      else{
        return root.totalRightWeight;
      }
    }
    
    return root.totalLeftWeight + root.totalRightWeight;
  }
  
  var totalWeights = 0.0;
  for(var i = 0; i < rootSegments.length; i++){
    var rootSegment = rootSegments[i];
    var p = rootSegment.getRootProbability();
    getTotalWeights(rootSegment, p, null);
    totalWeights += rootSegment.totalLeftWeight + rootSegment.totalRightWeight;
  }
  
  console.info(totalWeights/2.0);
  return totalWeights/2.0;
}



//getMinExpectedHorizontalTravelDistance(2, [10,20], [100000,400000], [600000,800000]);
getMinExpectedHorizontalTravelDistance(
5, 
[2.0, 8.0, 5.0, 9.0, 4.0], 
[5000.0, 2000.0, 7000.0, 9000.0, 0.0], 
[7000.0, 8000.0, 11000.0, 11000.0, 4000.0]);