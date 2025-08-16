// Bank of Canada API - Public data, no API key required
export class BankOfCanadaAPI {
  private static BASE_URL = 'https://www.bankofcanada.ca/valet';

  // Get current mortgage rates
  static async getMortgageRates() {
    try {
      // Get 5-year conventional mortgage lending rate
      const response = await fetch(`${this.BASE_URL}/observations/V80691311/json?recent=1`);
      const data = await response.json();
      
      if (data && data.observations && data.observations.length > 0) {
        return {
          rate: parseFloat(data.observations[0].V80691311.v),
          date: data.observations[0].d,
          source: 'Bank of Canada'
        };
      }
      
      return this.getFallbackRates();
    } catch (error) {
      console.error('Error fetching mortgage rates:', error);
      return this.getFallbackRates();
    }
  }

  // Get overnight rate (key policy rate)
  static async getOvernightRate() {
    try {
      const response = await fetch(`${this.BASE_URL}/observations/V39079/json?recent=1`);
      const data = await response.json();
      
      if (data && data.observations && data.observations.length > 0) {
        return {
          rate: parseFloat(data.observations[0].V39079.v),
          date: data.observations[0].d,
          source: 'Bank of Canada'
        };
      }
      
      return { rate: 5.0, date: new Date().toISOString(), source: 'Bank of Canada (Fallback)' };
    } catch (error) {
      console.error('Error fetching overnight rate:', error);
      return { rate: 5.0, date: new Date().toISOString(), source: 'Bank of Canada (Fallback)' };
    }
  }

  // Get inflation rate (CPI)
  static async getInflationRate() {
    try {
      const response = await fetch(`${this.BASE_URL}/observations/V41690973/json?recent=12`);
      const data = await response.json();
      
      if (data && data.observations && data.observations.length > 0) {
        const latest = data.observations[data.observations.length - 1];
        const previous = data.observations[data.observations.length - 2];
        
        return {
          currentRate: parseFloat(latest.V41690973.v),
          previousRate: parseFloat(previous?.V41690973?.v || latest.V41690973.v),
          date: latest.d,
          trend: parseFloat(latest.V41690973.v) > parseFloat(previous?.V41690973?.v || latest.V41690973.v) ? 'up' : 'down'
        };
      }
      
      return { currentRate: 3.8, previousRate: 4.1, date: new Date().toISOString(), trend: 'down' };
    } catch (error) {
      console.error('Error fetching inflation rate:', error);
      return { currentRate: 3.8, previousRate: 4.1, date: new Date().toISOString(), trend: 'down' };
    }
  }

  // Get exchange rates
  static async getExchangeRates() {
    try {
      const response = await fetch(`${this.BASE_URL}/observations/FXUSDCAD/json?recent=1`);
      const data = await response.json();
      
      if (data && data.observations && data.observations.length > 0) {
        return {
          usdCad: parseFloat(data.observations[0].FXUSDCAD.v),
          date: data.observations[0].d
        };
      }
      
      return { usdCad: 1.35, date: new Date().toISOString() };
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      return { usdCad: 1.35, date: new Date().toISOString() };
    }
  }

  private static getFallbackRates() {
    return {
      rate: 5.5,
      date: new Date().toISOString(),
      source: 'Bank of Canada (Fallback)'
    };
  }

  // Calculate mortgage payment with real rates
  static calculateMortgagePayment(principal: number, rate: number, years: number = 25): number {
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;
    
    if (monthlyRate === 0) return principal / numPayments;
    
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
           (Math.pow(1 + monthlyRate, numPayments) - 1);
  }
}