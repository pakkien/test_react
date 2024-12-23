export function calculateMargin(cost: number, price: number) {

    return parseFloat((price - cost).toFixed(2))  //TODO: DOUBLE CONFIRM
}


export function calculateMarginPercentage(cost: number, price: number) {

    //return parseFloat(((price-cost) / price * 100).toFixed(10));
    return parseFloat((price / cost).toFixed(10));

}

export function calculateTotalCost(cost: number, quantity: number) {

    return parseFloat((cost * quantity).toFixed(2));
}

export function calculateTotalPrice(price: number, quantity: number) {

    return parseFloat((price * quantity).toFixed(2));
}


export function calculateUnitPriceByMargin(unit_cost: number, margin: number) {

    var res = +unit_cost + +margin;
    return parseFloat(res.toFixed(2));  //TODO: DOUBLE CONFIRM
}

export function calculateUnitPriceByMarginPercentage(unit_cost: number, margin_percentage: number) {

   //return parseFloat(((100 * unit_cost) / (100 - margin_percentage)).toFixed(2))
   return parseFloat((margin_percentage - (unit_cost/(100-margin_percentage))).toFixed(2));

}

export function calculateGrandTotalAfterDiscountAndSST(grand_total: number, discount: number, sst:number){

    return parseFloat(((grand_total - discount) * (+sst + +100) / 100).toFixed(2));
}



