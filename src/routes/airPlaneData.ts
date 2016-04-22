

export class AirPlanData{
	
	public getStat(req, res): any{
		
	   let  sampleJson = { name: "Dnyanesh"}
	   
	   res.json(sampleJson);
	}
	
	public getStateByAirPortID(req, res): any{
		
	   let  sampleJson = { name: "Data by ID"}
	   
	   res.json(sampleJson);
	}
	
	public getReviewByAirPortID(req, res): any{
		
	   let  sampleJson = { name: "Data for review by ID"}
	   
	   res.json(sampleJson);
	}
}