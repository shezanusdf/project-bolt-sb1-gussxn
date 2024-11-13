export const recipes = [
  {
    id: '1',
    name: 'Chocolate Lava Cake',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=1000',
    description: 'Decadent chocolate cake with a gooey molten center',
    prepTime: '25 mins',
    difficulty: 'Medium',
    calories: 350,
    ingredients: [
      '200g dark chocolate',
      '100g butter',
      '4 eggs',
      '100g sugar',
      '2 tbsp flour'
    ],
    instructions: [
      'Preheat oven to 200°C',
      'Melt chocolate and butter',
      'Whisk eggs and sugar',
      'Combine mixtures and fold in flour',
      'Bake for 12-14 minutes'
    ]
  },
  {
    id: '2',
    name: 'Vanilla Bean Crème Brûlée',
    image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?auto=format&fit=crop&q=80&w=1000',
    description: 'Classic French dessert with a crispy caramelized top',
    prepTime: '45 mins',
    difficulty: 'Hard',
    calories: 300,
    ingredients: [
      '2 cups heavy cream',
      '1 vanilla bean',
      '4 egg yolks',
      '1/3 cup sugar',
      'Extra sugar for topping'
    ],
    instructions: [
      'Heat cream with vanilla',
      'Whisk yolks and sugar',
      'Temper the cream mixture',
      'Bake in water bath',
      'Chill and caramelize top'
    ]
  },
  {
    id: '3',
    name: 'Matcha Tiramisu',
    image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80&w=1000',
    description: 'Japanese twist on the Italian classic',
    prepTime: '30 mins',
    difficulty: 'Medium',
    calories: 280,
    ingredients: [
      'Matcha powder',
      'Ladyfingers',
      'Mascarpone cheese',
      'Heavy cream',
      'Sugar'
    ],
    instructions: [
      'Prepare matcha solution',
      'Whip mascarpone mixture',
      'Dip ladyfingers',
      'Layer ingredients',
      'Chill for 4 hours'
    ]
  }
] as const;