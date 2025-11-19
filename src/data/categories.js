export const categoryItems = {
  Hardware: [
    { id: 'hw1', name: 'Cordless Drill Kit', price: '$12/day', image: require('../../assets/images/drill kit.png') },
    { id: 'hw2', name: 'Circular Saw', price: '$15/day', image: require('../../assets/images/electric saw.png') },
    { id: 'hw3', name: 'Hammer Drill', price: '$14/day', image: require('../../assets/images/hammer drill.png') },
    { id: 'hw4', name: 'Laser Level', price: '$10/day', image: require('../../assets/images/laser level.png') },
    { id: 'hw5', name: 'Impact Driver', price: '$13/day', image: null },
    { id: 'hw6', name: 'Shop Vacuum', price: '$11/day', image: null },
    { id: 'hw7', name: 'Angle Grinder', price: '$9/day', image: null },
    { id: 'hw8', name: 'Stud Finder', price: '$6/day', image: null },
  ],
  Dress: [
    { id: 'dr1', name: 'Evening Gown', price: '$25/day', image: require('../../assets/images/eveing gown.jpg') },
    { id: 'dr2', name: 'Tuxedo Set', price: '$30/day', image: require('../../assets/images/tuxedo.png') },
    { id: 'dr3', name: 'Cocktail Dress', price: '$18/day', image: require('../../assets/images/cocktail dress.png') },
    { id: 'dr4', name: 'Bridesmaid Dress', price: '$22/day', image: require('../../assets/images/briadmaids dress.png') },
    { id: 'dr5', name: 'Designer Saree', price: '$28/day', image: null },
    { id: 'dr6', name: 'Lehenga Set', price: '$35/day', image: null },
    { id: 'dr7', name: 'Blazer', price: '$15/day', image: null },
    { id: 'dr8', name: 'Formal Shoes', price: '$10/day', image: null },
  ],
  Kitchen: [
    { id: 'ki1', name: 'Stand Mixer', price: '$14/day', image: require('../../assets/images/stand mixer.png') },
    { id: 'ki2', name: 'Air Fryer XL', price: '$10/day', image: require('../../assets/images/air fryer.png') },
    { id: 'ki3', name: 'Pressure Cooker', price: '$9/day', image: require('../../assets/images/pressure cooker.jpg') },
    { id: 'ki4', name: 'Food Processor', price: '$12/day', image: null },
    { id: 'ki5', name: 'Espresso Machine', price: '$18/day', image: null },
    { id: 'ki6', name: 'Sous Vide', price: '$8/day', image: null },
    { id: 'ki7', name: 'Induction Cooktop', price: '$11/day', image: null },
    { id: 'ki8', name: 'Dutch Oven', price: '$7/day', image: null },
  ],
  Crafts: [
    { id: 'cr1', name: 'Sewing Machine', price: '$10/day', image: require('../../assets/images/sewering machine.png') },
    { id: 'cr2', name: 'Cricut Cutter', price: '$14/day', image: null },
    { id: 'cr3', name: 'Hot Glue Gun Set', price: '$6/day', image: require('../../assets/images/hot glue gun.jpg') },
    { id: 'cr4', name: 'Embroidery Kit', price: '$8/day', image: null },
    { id: 'cr5', name: 'Easel & Canvas Stand', price: '$7/day', image: null },
    { id: 'cr6', name: 'Beading Kit', price: '$5/day', image: null },
    { id: 'cr7', name: 'Paper Trimmer', price: '$6/day', image: null },
    { id: 'cr8', name: 'Paint Set (24pc)', price: '$5/day', image: null },
  ],
};

export function getCategoryIcon(name) {
  switch (name) {
    case 'Hardware':
      return '🔨';
    case 'Dress':
      return '👗';
    case 'Kitchen':
      return '🥣';
    case 'Crafts':
      return '🎨';
    default:
      return '📦';
  }
}
