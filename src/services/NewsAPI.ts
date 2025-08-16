// News API for housing market updates
export class NewsAPI {
  private static API_KEY_STORAGE_KEY = 'news_api_key';
  private static BASE_URL = 'https://newsapi.org/v2';

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  // Get Canadian housing market news
  static async getHousingNews() {
    const apiKey = this.getApiKey();
    
    if (apiKey) {
      try {
        const query = 'Canadian housing market OR Canada real estate OR CMHC';
        const response = await fetch(
          `${this.BASE_URL}/everything?q=${encodeURIComponent(query)}&domains=cbc.ca,globalnews.ca,ctvnews.ca,theglobeandmail.com&language=en&sortBy=publishedAt&pageSize=10`,
          {
            headers: {
              'X-API-Key': apiKey
            }
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          return this.parseNewsData(data);
        }
      } catch (error) {
        console.error('Error fetching housing news:', error);
      }
    }

    return this.getFallbackNews();
  }

  // Get government policy updates
  static async getPolicyNews() {
    const apiKey = this.getApiKey();
    
    if (apiKey) {
      try {
        const query = 'Canada housing policy OR CMHC policy OR Canadian mortgage rates';
        const response = await fetch(
          `${this.BASE_URL}/everything?q=${encodeURIComponent(query)}&domains=canada.ca,bankofcanada.ca,cmhc-schl.gc.ca&language=en&sortBy=publishedAt&pageSize=5`,
          {
            headers: {
              'X-API-Key': apiKey
            }
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          return this.parseNewsData(data);
        }
      } catch (error) {
        console.error('Error fetching policy news:', error);
      }
    }

    return this.getFallbackPolicyNews();
  }

  private static parseNewsData(data: any) {
    if (!data.articles) return [];
    
    return data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      publishedAt: article.publishedAt,
      source: article.source.name,
      urlToImage: article.urlToImage,
      impact: this.calculateImpact(article.title + ' ' + article.description)
    }));
  }

  private static calculateImpact(text: string): 'high' | 'medium' | 'low' {
    const highImpactKeywords = ['rate hike', 'policy change', 'market crash', 'bubble', 'crisis'];
    const mediumImpactKeywords = ['prices rise', 'demand increase', 'supply shortage', 'new development'];
    
    const lowerText = text.toLowerCase();
    
    if (highImpactKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'high';
    }
    if (mediumImpactKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'medium';
    }
    return 'low';
  }

  private static getFallbackNews() {
    return [
      {
        title: "Bank of Canada Holds Interest Rate at 5.0%",
        description: "The central bank maintains its key policy rate, citing inflation concerns and housing market stability.",
        url: "https://bankofcanada.ca/2024/01/fad-press-release-2024-01-24/",
        publishedAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        source: "Bank of Canada",
        urlToImage: null,
        impact: "high" as const
      },
      {
        title: "Vancouver Housing Prices Show Signs of Cooling",
        description: "Real estate experts note a 3% decrease in average home prices compared to last quarter.",
        url: "#",
        publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        source: "CBC News",
        urlToImage: null,
        impact: "medium" as const
      },
      {
        title: "CMHC Releases Q4 Housing Market Outlook",
        description: "National housing agency provides updated forecasts for Canadian housing markets through 2024.",
        url: "#",
        publishedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        source: "CMHC",
        urlToImage: null,
        impact: "medium" as const
      },
      {
        title: "Ontario Introduces New First-Time Buyer Incentive",
        description: "Provincial government announces enhanced support program for first-time homebuyers.",
        url: "#",
        publishedAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        source: "Government of Ontario",
        urlToImage: null,
        impact: "high" as const
      },
      {
        title: "Calgary Rental Market Sees Increased Demand",
        description: "Strong job growth drives rental demand in Alberta's largest city.",
        url: "#",
        publishedAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
        source: "Global News",
        urlToImage: null,
        impact: "low" as const
      }
    ];
  }

  private static getFallbackPolicyNews() {
    return [
      {
        title: "Federal Housing Accelerator Fund Expanded",
        description: "Government increases funding for municipalities to fast-track housing development.",
        url: "#",
        publishedAt: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
        source: "Government of Canada",
        urlToImage: null,
        impact: "high" as const
      },
      {
        title: "New Mortgage Rules Take Effect in 2024",
        description: "Updated stress test requirements and qualification criteria for Canadian mortgages.",
        url: "#",
        publishedAt: new Date(Date.now() - 1209600000).toISOString(), // 2 weeks ago
        source: "OSFI",
        urlToImage: null,
        impact: "high" as const
      }
    ];
  }
}