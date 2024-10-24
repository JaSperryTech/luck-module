export const luckSystem = (() => {
  let baseLuckScore = 0; // Base luck score (can be a fraction)
  let modifiers = [];    // Array to hold all active modifiers (boosts or penalties)

  // Generate base luck score (0 to 100) as a floating-point number
  const generateBaseLuck = () => {
    baseLuckScore = (Math.random() * 100).toFixed(2); // Generate up to 2 decimal places
    return parseFloat(baseLuckScore);
  };

  // Function to round values to 2 decimal places
  const roundToTwoDecimals = (value) => {
    return Math.round(value * 100) / 100; // Rounding to 2 decimal places
  };

  // Function to add a modifier (positive or negative) as a fraction
  // Add a 'stack' parameter to determine stacking behavior
  const addModifier = (description, value, stack = true) => {
    const existingModifier = modifiers.find(mod => mod.description === description);
    if (existingModifier) {
      if (stack) {
        // If stacking is allowed, increase the count and value
        existingModifier.count += 1;
        existingModifier.value = roundToTwoDecimals(existingModifier.value + parseFloat(value)); // Round the new value
      } else {
        // If stacking is not allowed, just increase the count without changing the value
        existingModifier.count += 1;
      }
    } else {
      // If it doesn't exist, add it to the array
      modifiers.push({ description, value: roundToTwoDecimals(parseFloat(value)), count: 1, stack });
    }
  };

  // Function to remove a modifier by its description
  const removeModifier = (description) => {
    const existingModifier = modifiers.find(mod => mod.description === description);
    if (existingModifier) {
      existingModifier.count -= 1; // Decrease the count
      if (existingModifier.count <= 0) {
        // Remove the modifier if the count is zero or less
        modifiers = modifiers.filter(mod => mod.description !== description);
      } else if (existingModifier.stack) {
        // Update the value and round if stacking is allowed
        existingModifier.value = roundToTwoDecimals(existingModifier.value - (existingModifier.value / existingModifier.count));
      }
    }
  };

  // Calculate final luck by applying all the modifiers
  const calculateFinalLuck = () => {
    let finalLuck = parseFloat(baseLuckScore); // Ensure baseLuckScore is a float
    modifiers.forEach(mod => {
      finalLuck += mod.value; // Apply each modifier
    });

    // No clamping, so luck can go below 0 or above 100
    return roundToTwoDecimals(finalLuck);
  };

  // Check the luck with the modifiers applied
  const checkLuck = () => {
    const finalLuckScore = calculateFinalLuck();
    let result;
    if (finalLuckScore > 150) {
      result = "You're incredibly lucky, off the charts!";
    } else if (finalLuckScore > 100) {
      result = "Your luck is sky-high!";
    } else if (finalLuckScore > 80) {
      result = "You're extremely lucky!";
    } else if (finalLuckScore > 50) {
      result = "You're somewhat lucky!";
    } else if (finalLuckScore > 20) {
      result = "You're a little unlucky.";
    } else if (finalLuckScore > 0) {
      result = "Luck is not on your side today.";
    } else {
      result = "You are extremely unlucky!";
    }

    return { baseLuckScore: parseFloat(baseLuckScore), finalLuckScore: finalLuckScore, result, modifiers };
  };

  // Public API of the module
  return {
    generateBaseLuck,
    addModifier,
    removeModifier,
    checkLuck,
  };
})();
