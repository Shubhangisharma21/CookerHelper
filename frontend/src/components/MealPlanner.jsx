import React, { useState, useEffect } from 'react';
import { Plus, Clock, Users, Trash2, Calendar } from 'lucide-react';
import { getAllRecipes } from '../api';

const MealPlanner = ({ mealPlans, setMealPlans }) => {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('breakfast');

  const [availableRecipes, setAvailableRecipes] = useState([]);
  useEffect(() => {
    getAllRecipes()
      .then(setAvailableRecipes)
      .catch(console.error);
  }, []);

  const getWeekDates = (startDate) => {
    const dates = [];
    const start = new Date(startDate);
    start.setDate(start.getDate() - start.getDay());
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(selectedWeek);
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const mealTypes = ['breakfast', 'lunch', 'dinner'];

  const getMealPlan = (date) => {
    return mealPlans.find(plan => plan.date === date);
  };

  const addMealToPlan = (recipe) => {
    const existingPlan = mealPlans.find(plan => plan.date === selectedDate);
    if (existingPlan) {
      const updatedPlans = mealPlans.map(plan =>
        plan.date === selectedDate
          ? { ...plan, meals: { ...plan.meals, [selectedMealType]: recipe } }
          : plan
      );
      setMealPlans(updatedPlans);
    } else {
      const newPlan = {
        id: Date.now().toString(),
        date: selectedDate,
        meals: { [selectedMealType]: recipe }
      };
      setMealPlans([...mealPlans, newPlan]);
    }
    setShowAddModal(false);
  };

  const removeMealFromPlan = (date, mealType) => {
    const updatedPlans = mealPlans.map(plan => {
      if (plan.date === date) {
        const updatedMeals = { ...plan.meals };
        delete updatedMeals[mealType];
        return { ...plan, meals: updatedMeals };
      }
      return plan;
    }).filter(plan => Object.keys(plan.meals).length > 0);
    setMealPlans(updatedPlans);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-peachy/20 to-sage/30 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-peachy to-sage mb-6">
            <div className="bg-cream rounded-full px-8 py-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cinnamon to-charcoal bg-clip-text text-transparent">
                Meal Planner
              </h1>
            </div>
          </div>
          <p className="text-xl text-charcoal/80 max-w-2xl mx-auto leading-relaxed">
            Plan your weekly meals and stay organized with smart scheduling
          </p>
        </div>

        {/* Week Navigation */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-peachy/20">
          <div className="flex items-center gap-4 mb-6 lg:mb-0">
            <Calendar className="h-6 w-6 text-cinnamon" />
            <h2 className="text-2xl font-bold text-charcoal">
              {selectedWeek.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedWeek(new Date(selectedWeek.getTime() - 7 * 24 * 60 * 60 * 1000))}
              className="px-6 py-3 bg-sage/20 text-sage border border-sage/30 rounded-full font-medium hover:bg-sage hover:text-white transition-all"
            >
              ← Previous Week
            </button>
            <button
              onClick={() => setSelectedWeek(new Date(selectedWeek.getTime() + 7 * 24 * 60 * 60 * 1000))}
              className="px-6 py-3 bg-sage/20 text-sage border border-sage/30 rounded-full font-medium hover:bg-sage hover:text-white transition-all"
            >
              Next Week →
            </button>
          </div>
        </div>

        {/* Weekly Calendar */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden mb-12 border border-peachy/20">
          {/* Day Headers */}
          <div className="grid grid-cols-7 bg-gradient-to-r from-peachy/20 to-sage/20">
            {weekDates.map((date, index) => (
              <div key={index} className="p-6 text-center border-r border-peachy/20 last:border-r-0">
                <div className="font-bold text-charcoal text-lg">{dayNames[index]}</div>
                <div className="text-charcoal/70 mt-1">{formatDisplayDate(date)}</div>
              </div>
            ))}
          </div>

          {/* Meal Rows */}
          {mealTypes.map((mealType, mealIndex) => (
            <div key={mealType} className="border-t border-peachy/20">
              <div className="grid grid-cols-7">
                {weekDates.map((date, dayIndex) => {
                  const dateString = formatDate(date);
                  const mealPlan = getMealPlan(dateString);
                  const meal = mealPlan?.meals[mealType];
                  
                  return (
                    <div
                      key={`${mealType}-${dayIndex}`}
                      className="relative border-r border-peachy/20 last:border-r-0 min-h-[140px] group"
                    >
                      {/* Meal Type Label (only on first column) */}
                      {dayIndex === 0 && (
                        <div className="absolute left-4 top-4 z-10">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                            mealType === 'breakfast' ? 'bg-biscuit/20 text-cinnamon border border-biscuit/30' :
                            mealType === 'lunch' ? 'bg-sage/20 text-sage border border-sage/30' :
                            'bg-rosy/20 text-rosy border border-rosy/30'
                          }`}>
                            {mealType}
                          </span>
                        </div>
                      )}

                      <div className="p-4 h-full flex flex-col justify-center">
                        {meal ? (
                          <div className="bg-cream/60 rounded-2xl p-4 relative group-hover:bg-cream/80 transition-all shadow-sm border border-peachy/20">
                            <h4 className="font-bold text-charcoal text-lg mb-2 pr-8">{meal.title}</h4>
                            <div className="flex items-center text-sm text-charcoal/70 gap-4">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{(meal.prepTime || 0) + (meal.cookTime || 0)}m</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{meal.servings || 0}</span>
                              </div>
                            </div>
                            
                            {/* Delete Button */}
                            <button
                              onClick={() => removeMealFromPlan(dateString, mealType)}
                              className="absolute top-2 right-2 p-2 bg-rosy/20 hover:bg-rosy hover:text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedDate(dateString);
                              setSelectedMealType(mealType);
                              setShowAddModal(true);
                            }}
                            className="w-full h-24 border-2 border-dashed border-peachy/40 rounded-2xl flex items-center justify-center hover:border-cinnamon hover:bg-cream/30 transition-all group p-4"
                          >
                            <div className="text-center">
                              <Plus className="h-6 w-6 text-peachy group-hover:text-cinnamon mx-auto mb-1" />
                              <span className="text-sm text-peachy group-hover:text-cinnamon font-medium">Add Meal</span>
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Summary */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-peachy/20">
          <h3 className="text-2xl font-bold text-charcoal mb-6">Weekly Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-cream/40 rounded-2xl border border-peachy/20">
              <div className="text-3xl font-bold text-cinnamon mb-2">
                {mealPlans.reduce((total, plan) => total + Object.keys(plan.meals).length, 0)}
              </div>
              <div className="text-charcoal/70 font-medium">Planned Meals</div>
            </div>
            <div className="text-center p-6 bg-cream/40 rounded-2xl border border-sage/20">
              <div className="text-3xl font-bold text-sage mb-2">
                {Math.round(mealPlans.reduce((total, plan) => {
                  return total + Object.values(plan.meals).reduce((mealTotal, meal) => {
                    return mealTotal + (meal?.prepTime || 0) + (meal?.cookTime || 0);
                  }, 0);
                }, 0) / 60 * 10) / 10}h
              </div>
              <div className="text-charcoal/70 font-medium">Total Cook Time</div>
            </div>
            <div className="text-center p-6 bg-cream/40 rounded-2xl border border-biscuit/20">
              <div className="text-3xl font-bold text-charcoal mb-2">
                {mealPlans.reduce((total, plan) => {
                  return total + Object.values(plan.meals).reduce((mealTotal, meal) => {
                    return mealTotal + (meal?.servings || 0);
                  }, 0);
                }, 0)}
              </div>
              <div className="text-charcoal/70 font-medium">Total Servings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Meal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-charcoal/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-peachy/30">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-peachy/20 px-8 py-6 rounded-t-3xl">
              <h3 className="text-2xl font-bold text-charcoal">
                Add {selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1)} Meal
              </h3>
              <p className="text-charcoal/70 mt-1">Choose from your recipe collection</p>
            </div>

            <div className="p-8">
              {availableRecipes.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-cream/60 rounded-2xl p-8 border border-peachy/20">
                    <h4 className="text-xl font-bold text-charcoal mb-2">No recipes available</h4>
                    <p className="text-charcoal/70">Add some recipes in Recipe Manager first!</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {availableRecipes.map((recipe) => (
                    <div
                      key={recipe._id || recipe.id}
                      className="flex items-center justify-between p-6 bg-cream/40 rounded-2xl hover:bg-cream/60 transition-all cursor-pointer border border-peachy/20 hover:border-cinnamon/40 group"
                      onClick={() => addMealToPlan(recipe)}
                    >
                      <div className="flex-1">
                        <h4 className="font-bold text-charcoal text-xl mb-2 group-hover:text-cinnamon transition-colors">
                          {recipe.title}
                        </h4>
                        <p className="text-charcoal/70 text-sm mb-3 line-clamp-2 leading-relaxed">
                          {recipe.description}
                        </p>
                        <div className="flex items-center text-sm text-charcoal/60 gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{(recipe.prepTime || 0) + (recipe.cookTime || 0)}m</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{recipe.servings || 0} servings</span>
                          </div>
                        </div>
                      </div>
                      <button
                        className="ml-6 px-6 py-3 bg-gradient-to-r from-cinnamon to-sage text-white rounded-full font-medium hover:shadow-lg transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          addMealToPlan(recipe);
                        }}
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-peachy/20 px-8 py-6 rounded-b-3xl flex justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-3 text-charcoal hover:text-charcoal/70 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;