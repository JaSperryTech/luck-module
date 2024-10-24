import { luckSystem } from './luckSystem.js';

// Function to display luck outcome
const displayLuck = () => {
  luckSystem.generateBaseLuck(); // Generate a new base luck score
  const luckResult = luckSystem.checkLuck(); // Check the final luck score

  // Display base and final luck scores, modifiers, and result
  const luckElement = document.getElementById('luck-result');
  const modifiersText = luckResult.modifiers.map(mod => `${mod.description} (x${mod.count}): ${mod.value}`).join(', ');

  luckElement.innerHTML = `
    Base Luck: ${luckResult.baseLuckScore.toFixed(2)} <br>
    Modifiers: ${modifiersText || 'None'} <br>
    Final Luck: ${luckResult.finalLuckScore.toFixed(2)} <br>
    Result: ${luckResult.result}
  `;
};

// Function to add a luck modifier with stacking choice
const addLuckModifier = (description, value, stack = true) => {
  luckSystem.addModifier(description, value, stack);
  displayLuck(); // Update the displayed luck with new modifiers
};

// Function to remove a luck modifier
const removeLuckModifier = (description) => {
  luckSystem.removeModifier(description);
  displayLuck(); // Update the displayed luck after removing modifier
};

// Attach the displayLuck function to the button click
document.getElementById('check-luck-button').addEventListener('click', displayLuck);

// Add event listeners to buttons for adding/removing modifiers
document.getElementById('add-boost-button').addEventListener('click', () => addLuckModifier('Luck Boost', 0.20, true)); // 1/5 boost, stacking
document.getElementById('add-penalty-button').addEventListener('click', () => addLuckModifier('Bad Luck', -0.15, false)); // 1/6 penalty, non-stacking
document.getElementById('remove-boost-button').addEventListener('click', () => removeLuckModifier('Luck Boost')); // Ensure this matches the description used in add
document.getElementById('remove-penalty-button').addEventListener('click', () => removeLuckModifier('Bad Luck')); // Ensure this matches the description used in add
