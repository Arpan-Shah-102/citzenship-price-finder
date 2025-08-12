document.querySelector('.sumbit').addEventListener('click', () => {
  const netWorthInput = document.getElementById('net-worth').value;
  const country = document.querySelector('.country-from').value;
  const citizenshipPriceElement = document.querySelector('.citizenship-price');

  const netWorth = parseFloat(netWorthInput);

  // Validate net worth input
  if (isNaN(netWorth) || netWorth <= 0) {
    citizenshipPriceElement.textContent = 'Invalid Net Worth';
    return;
  }

  if (netWorth > 400000000000) {
    citizenshipPriceElement.textContent = 'Net Worth cannot exceed $400 Billion';
    return;
  }

  // Special cases for Mexico and China
  if (country === 'mexico') {
    citizenshipPriceElement.textContent = 'Deported';
    return;
  }

  if (country === 'china') {
    citizenshipPriceElement.textContent = 'Rejected';
    return;
  }

  // Check for special conditions
  if (netWorth >= 1000000000) {
    citizenshipPriceElement.textContent = 'Free';
    return;
  }

  if (netWorth >= 10000000 && country !== 'china' && country !== 'mexico') {
    citizenshipPriceElement.textContent = '$5 Million Gold Citizenship';
    return;
  }

  // Country multipliers
  const countryMultipliers = {
    canada: 0.5,
    mexico: 0.05,
    china: 0.9,
    india: 0.5,
    europe: 0.1,
    australia: 0.15, // Fixed typo from "austrailia"
    southamerica: 0.9,
    africa: 0.6,
  };

  const multiplier = countryMultipliers[country];

  if (!multiplier) {
    citizenshipPriceElement.textContent = 'Please select a valid country';
    return;
  }

  // Calculate citizenship price
  const citizenshipPrice = netWorth * multiplier;
  citizenshipPriceElement.textContent = `$${citizenshipPrice.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
});