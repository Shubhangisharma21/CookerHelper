import React, { useState, useMemo } from 'react';
import { ShoppingCart, Check, X, Calendar, Package, ListChecks } from 'lucide-react';

const ShoppingList = ({ mealPlans = [] }) => {
  const [checkedItems, setCheckedItems] = useState(new Set());

  // Move categorizeIngredient function BEFORE it's used
  const categorizeIngredient = (ingredient) => {
    const produce = ['tomato', 'onion', 'garlic', 'pepper', 'lettuce', 'cucumber', 'carrot', 'potato'];
    const meat = ['chicken', 'beef', 'pork', 'fish', 'salmon', 'turkey'];
    const dairy = ['milk', 'cheese', 'butter', 'yogurt', 'cream'];
    const grains = ['rice', 'pasta', 'bread', 'flour', 'oats'];
    
    const lower = ingredient.toLowerCase();
    if (produce.some(p => lower.includes(p))) return 'Produce';
    if (meat.some(m => lower.includes(m))) return 'Meat';
    if (dairy.some(d => lower.includes(d))) return 'Dairy';
    if (grains.some(g => lower.includes(g))) return 'Grains';
    return 'Other';
  };

  // Auto-generate shopping list from meal plans
  const shoppingItems = useMemo(() => {
    if (!mealPlans || !Array.isArray(mealPlans)) {
      return [];
    }

    const ingredientCounts = {};
    
    mealPlans.forEach(plan => {
      if (plan && plan.meals) {
        Object.values(plan.meals).forEach(meal => {
          if (meal && Array.isArray(meal.ingredients)) {
            meal.ingredients.forEach(ingredient => {
              if (ingredient && ingredient.trim()) {
                const key = ingredient.toLowerCase().trim();
                ingredientCounts[key] = (ingredientCounts[key] || 0) + 1;
              }
            });
          }
        });
      }
    });

    return Object.entries(ingredientCounts).map(([ingredient, count], index) => ({
      id: `item-${index}`,
      name: ingredient.charAt(0).toUpperCase() + ingredient.slice(1),
      quantity: count > 1 ? `${count} portions` : '1 portion',
      category: categorizeIngredient(ingredient),
      checked: checkedItems.has(`item-${index}`)
    }));
  }, [mealPlans, checkedItems]);

  const toggleItem = (id) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const categories = ['Produce', 'Meat', 'Dairy', 'Grains', 'Other'];
  const groupedItems = categories.reduce((acc, category) => {
    acc[category] = shoppingItems.filter(item => item.category === category);
    return acc;
  }, {});

  const totalItems = shoppingItems.length;
  const checkedCount = checkedItems.size;
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  const categoryIcons = {
    'Produce': '🥬',
    'Meat': '🥩',
    'Dairy': '🥛',
    'Grains': '🌾',
    'Other': '📦'
  };

  const categoryColors = {
    'Produce': 'sage',
    'Meat': 'rosy',
    'Dairy': 'biscuit',
    'Grains': 'cinnamon',
    'Other': 'peachy'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-peachy/20 to-sage/30 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-peachy to-sage mb-6">
            <div className="bg-cream rounded-full px-8 py-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cinnamon to-charcoal bg-clip-text text-transparent">
                Shopping List
              </h1>
      </div>
          </div>
          <p className="text-xl text-charcoal/80 max-w-2xl mx-auto leading-relaxed">
            Auto-generated from your weekly meal plan
          </p>
        </div>

        {totalItems === 0 ? (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-16 text-center border border-peachy/20">
            <div className="bg-cream/60 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Package className="h-12 w-12 text-cinnamon/60" />
        </div>
            <h3 className="text-3xl font-bold text-charcoal mb-4">No Items Yet</h3>
            <p className="text-xl text-charcoal/70 mb-6 leading-relaxed">
              Add recipes to your meal planner to automatically generate your shopping list!
            </p>
            <div className="bg-gradient-to-r from-peachy/20 to-sage/20 border border-peachy/30 rounded-2xl p-6">
              <p className="text-lg text-charcoal font-medium">
                💡 <strong>Tip:</strong> Go to Meal Planner → Add recipes to your week → Come back here to see your shopping list!
              </p>
          </div>
          </div>
        ) : (
          <>
            {/* Progress Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 mb-12 border border-peachy/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <ListChecks className="h-6 w-6 text-cinnamon" />
                  <h3 className="text-2xl font-bold text-charcoal">Shopping Progress</h3>
          </div>
                <div className="text-lg text-charcoal/70 font-medium">
                  {checkedCount} of {totalItems} items completed
        </div>
      </div>

              <div className="relative">
                <div className="w-full bg-cream/60 rounded-full h-6 border border-peachy/20">
                  <div
                    className="bg-gradient-to-r from-cinnamon to-sage h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${progress}%` }}
                  >
                    {progress > 15 && (
                      <span className="text-white text-sm font-medium">
                        {Math.round(progress)}%
                      </span>
                    )}
                  </div>
      </div>
                {progress <= 15 && (
                  <div className="absolute top-0 left-2 text-charcoal/70 text-sm font-medium leading-6">
                    {Math.round(progress)}%
            </div>
                )}
            </div>
            </div>

      {/* Shopping List by Category */}
            <div className="space-y-8">
        {categories.map(category => {
          const categoryItems = groupedItems[category] || [];
          if (categoryItems.length === 0) return null;
                
                const categoryColor = categoryColors[category];
                const completedInCategory = categoryItems.filter(item => item.checked).length;
                
          return (
                  <div key={category} className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-peachy/20">
                    {/* Category Header */}
                    <div className={`bg-gradient-to-r from-${categoryColor}/20 to-${categoryColor}/10 border-b border-${categoryColor}/20 px-8 py-6`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">{categoryIcons[category]}</div>
                          <div>
                            <h3 className="text-2xl font-bold text-charcoal">{category}</h3>
                            <p className="text-charcoal/70">
                              {completedInCategory}/{categoryItems.length} completed
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-charcoal/70 mb-1">Progress</div>
                          <div className={`w-16 h-2 bg-${categoryColor}/20 rounded-full`}>
                            <div 
                              className={`h-2 bg-${categoryColor} rounded-full transition-all duration-300`}
                              style={{ width: `${categoryItems.length > 0 ? (completedInCategory / categoryItems.length) * 100 : 0}%` }}
                            />
                          </div>
                        </div>
                      </div>
              </div>

                    {/* Category Items */}
                    <div className="p-8">
                      <div className="space-y-4">
                        {categoryItems.map((item) => (
                  <div
                    key={item.id}
                            className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300 group cursor-pointer ${
                              item.checked
                                ? `bg-${categoryColor}/10 border-${categoryColor}/30 opacity-70`
                                : `bg-cream/40 border-peachy/20 hover:border-${categoryColor}/40 hover:bg-${categoryColor}/5`
                            }`}
                            onClick={() => toggleItem(item.id)}
                          >
                            <div className="flex items-center gap-6">
                              <div className="relative">
                      <button
                                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                          item.checked
                                      ? `bg-${categoryColor} border-${categoryColor} text-white`
                                      : `border-${categoryColor}/40 hover:border-${categoryColor} group-hover:bg-${categoryColor}/10`
                        }`}
                      >
                                  {item.checked && <Check className="h-5 w-5" />}
                      </button>
                              </div>
                              <div>
                                <h4 className={`text-xl font-bold transition-all ${
                                  item.checked 
                                    ? 'line-through text-charcoal/60' 
                                    : 'text-charcoal group-hover:text-cinnamon'
                                }`}>
                                  {item.name}
                                </h4>
                                <p className={`text-lg ${
                                  item.checked 
                                    ? 'text-charcoal/50' 
                                    : 'text-charcoal/70'
                                }`}>
                                  {item.quantity}
                                </p>
                              </div>
                            </div>
                            
                            {item.checked && (
                              <div className="text-sage">
                                <Check className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary Footer */}
            {totalItems > 0 && (
              <div className="mt-12 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-peachy/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="p-6 bg-cream/40 rounded-2xl border border-peachy/20">
                    <div className="text-3xl font-bold text-cinnamon mb-2">{totalItems}</div>
                    <div className="text-charcoal/70 font-medium">Total Items</div>
                  </div>
                  <div className="p-6 bg-cream/40 rounded-2xl border border-sage/20">
                    <div className="text-3xl font-bold text-sage mb-2">{checkedCount}</div>
                    <div className="text-charcoal/70 font-medium">Completed</div>
                    </div>
                  <div className="p-6 bg-cream/40 rounded-2xl border border-rosy/20">
                    <div className="text-3xl font-bold text-rosy mb-2">{totalItems - checkedCount}</div>
                    <div className="text-charcoal/70 font-medium">Remaining</div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;