export const categoryItems = {
  Hardware: [
    { id: 'hw1', name: 'Cordless Drill Kit', price: '$12/day' },
    { id: 'hw2', name: 'Circular Saw', price: '$15/day' },
    { id: 'hw3', name: 'Hammer Drill', price: '$14/day' },
    { id: 'hw4', name: 'Laser Level', price: '$10/day' },
    { id: 'hw5', name: 'Impact Driver', price: '$13/day' },
    { id: 'hw6', name: 'Shop Vacuum', price: '$11/day' },
    { id: 'hw7', name: 'Angle Grinder', price: '$9/day' },
    { id: 'hw8', name: 'Stud Finder', price: '$6/day' },
  ],
  Dress: [
    { id: 'dr1', name: 'Evening Gown', price: '$25/day' },
    { id: 'dr2', name: 'Tuxedo Set', price: '$30/day' },
    { id: 'dr3', name: 'Cocktail Dress', price: '$18/day' },
    { id: 'dr4', name: 'Bridesmaid Dress', price: '$22/day' },
    { id: 'dr5', name: 'Designer Saree', price: '$28/day' },
    { id: 'dr6', name: 'Lehenga Set', price: '$35/day' },
    { id: 'dr7', name: 'Blazer', price: '$15/day' },
    { id: 'dr8', name: 'Formal Shoes', price: '$10/day' },
  ],
  Kitchen: [
    { id: 'ki1', name: 'Stand Mixer', price: '$14/day' },
    { id: 'ki2', name: 'Air Fryer XL', price: '$10/day' },
    { id: 'ki3', name: 'Pressure Cooker', price: '$9/day' },
    { id: 'ki4', name: 'Food Processor', price: '$12/day' },
    { id: 'ki5', name: 'Espresso Machine', price: '$18/day' },
    { id: 'ki6', name: 'Sous Vide', price: '$8/day' },
    { id: 'ki7', name: 'Induction Cooktop', price: '$11/day' },
    { id: 'ki8', name: 'Dutch Oven', price: '$7/day' },
  ],
  Crafts: [
    { id: 'cr1', name: 'Sewing Machine', price: '$10/day' },
    { id: 'cr2', name: 'Cricut Cutter', price: '$14/day' },
    { id: 'cr3', name: 'Hot Glue Gun Set', price: '$6/day' },
    { id: 'cr4', name: 'Embroidery Kit', price: '$8/day' },
    { id: 'cr5', name: 'Easel & Canvas Stand', price: '$7/day' },
    { id: 'cr6', name: 'Beading Kit', price: '$5/day' },
    { id: 'cr7', name: 'Paper Trimmer', price: '$6/day' },
    { id: 'cr8', name: 'Paint Set (24pc)', price: '$5/day' },
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
