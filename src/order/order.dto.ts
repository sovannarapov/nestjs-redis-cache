export class OrderDto {
  orderNumber: string;
  zone: number;
  section: string;
  generatedCode: string;
  maxValue: string;
  minValue: string;
  discountPercentage: number;
  loyalticode: string;
  deliveryCode: string;
  stakeholder: {
    costzone: string;
  };
  orderLines: [
    {
      deliveryZone: string;
      zone: number;
      uomCode: number;
      orderNumber: string;
      orderLineNumber: number;
      deliveryCode: string;
      itemcode: string;
      section: string;
      salesPrice: number;
      maxValue: string;
      expectedDate: number;
      planedDate: number;
      otherCharges: {
        upcharge: number;
      };
      totaTax: number;
      storeLocation: string;
      deliveryLocation: {
        name: string;
      };
      item: {
        depth: string;
        userDefinedField2Item: number;
        mode: {
          config: {
            name: string;
          };
        };
      };
    },
  ];
}
