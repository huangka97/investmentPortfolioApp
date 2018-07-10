var _ = require('underscore');

module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for t
  //The sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    var largest=0;
    // Fields to be parsed: "originalInvestment", "valueToday"
    arr.forEach(function(element){
      if(element.originalInvestment>largest){
        largest=element.originalInvestment;
      }
    })
    return largest;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var sum=0;
    var counter=0;
    arr.forEach(function(element){
      sum+=element.originalInvestment;
      counter++;

    })
    return sum/counter;
  },

  // Find out how much a company got as the original investments. In this case, You
  // will have to iterate over the companies and find all the investments for each
  // company and add them up to find how much money they started with.
  // Return an object that contains company ids as keys and their total original investment
  // as values. The object's structure should look something like this:
  // {
  //  1: 595000,
  //  2: 1024000,
  //   ...
  // }
  totalOriginalInvestmentForCompanies: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var returnObj = {}
    _.each(arr, (investments) => {
      if (!returnObj.hasOwnProperty(investments.company)) {
      returnObj[investments.company] = investments.originalInvestment;
    } else {
     returnObj[investments.company] += investments.originalInvestment;
    }
    })
    return returnObj;
  },

  // Find out how much money an investor spent as  original investments. You will
  // need to iterate through all the investments, find all the investments for each
  // investor and add them up to find how much money someone invested at the beginning.
  // Return an object that contains investor ids as keys and their total original investment
  // as values.  The object's structure should look something like this:
  // {
  //  1: 595000,
  //  2: 1024000,
  //   ...
  // }
  totalOriginalInvestmentsByInvestors: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var returnObj={}
    _.each(arr,(investments)=>{
      if(!returnObj.hasOwnProperty(investments.investorId)){
        returnObj[investments.investorId]=investments.originalInvestment;
      }else{
        returnObj[investments.investorId]+=investments.originalInvestment;
      }
    })
    return returnObj;
  },

  // This function is similar to the one above, but it returns the current value
  // for each investor. To get this value, you need to iterate through all the investments,
  // find all the currentValues for each investor and add them up to find how much
  // money someone has now from their investment
  // Return an object that contains investor ids as keys and their total todayValue
  // as values. The object's structure should look something like this:
  // {
  //  1: 595000,
  //  2: 1024000,
  //   ...
  // }
    // Fields to be parsed: "originalInvestment", "valueToday"
  totalCurrentValueOfInvestors: function(arr){
    var returnObj={}
    _.each(arr,(investments)=>{
      if(!returnObj.hasOwnProperty(investments.investorId)){
        returnObj[investments.investorId]=investments.valueToday;
      }else{
        returnObj[investments.investorId]+=investments.valueToday;
      }
    })
    //console.log("LOOK BENEATH ME")
    //console.log(returnObj);
    return returnObj;
  },

  // To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. Calculate this for all investors and figure out who the
  // best one is!
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
  bestInvestorByValueIncrease: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var returnObj={}
    
    var largestValue=0;
    var bestInvestor;
    var idArray=[];
    //console.log(typeof(totalCurrentValueOfInvestors));
    var currentValue=(this.totalCurrentValueOfInvestors(arr));
    var originalInvestors=(this.totalOriginalInvestmentsByInvestors(arr));
    //console.log(currentValue);
    //console.log(originalInvestors);
    _.each(arr,(investments)=>{
      idArray.push(investments.investorId);
    })
    for(var i=0;i<idArray.length;i++){
      if((originalInvestors[i]-currentValue[i])>largestValue){
        largestValue=(currentValue[i]-originalInvestors[i]);
        bestInvestor=i;
        //console.log(largestValue);
        //console.log(bestInvestor);
      }
    }
 
    return String(bestInvestor);
   


  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
 
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var idArray=[];
    var largestInvestment=0;
    var mostInvestedCompany;
    var mostInvestedCompanyArray=(this.totalOriginalInvestmentForCompanies(arr));
    console.log(mostInvestedCompanyArray);
    _.each(arr,(investments)=>{
      idArray.push(investments.company);
    })
    for(var i=0;i<idArray.length;i++){
      if(mostInvestedCompanyArray[i]>largestInvestment){
        largestInvestment=mostInvestedCompanyArray[i];
        mostInvestedCompany=i;
      }
    }
    return String(mostInvestedCompany);

  }

}
