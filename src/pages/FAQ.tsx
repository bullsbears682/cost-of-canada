import React from 'react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "How accurate are the calculators?",
      answer: "Our calculators use real data from Statistics Canada, Bank of Canada, and other official sources. However, results are estimates and actual costs may vary based on individual circumstances, market conditions, and location-specific factors."
    },
    {
      question: "Do I need to create an account to use the tools?",
      answer: "Yes, creating an account allows you to save your calculations, access all features, and receive updates. Your account is free and secure."
    },
    {
      question: "How often is the data updated?",
      answer: "We update our data regularly from official Canadian government sources. Market data is refreshed daily, while demographic and economic indicators are updated as new official data becomes available."
    },
    {
      question: "Can I use this for investment decisions?",
      answer: "No, MapleMetrics provides educational tools and estimates only. This is not financial advice. Always consult with qualified financial professionals before making investment or major financial decisions."
    },
    {
      question: "Which cities and provinces are covered?",
      answer: "We cover all major Canadian cities and provinces, with detailed data for metropolitan areas. Rural areas may have less granular data but are still included in provincial averages."
    },
    {
      question: "How do you protect my data?",
      answer: "We use industry-standard encryption and security measures. We don't sell your personal information and only collect what's necessary to provide our services. See our Privacy Policy for details."
    },
    {
      question: "Are the government benefits calculations official?",
      answer: "Our benefits finder provides estimates based on publicly available government criteria. For official benefit applications and exact amounts, always consult the relevant government websites or offices."
    },
    {
      question: "Can I export my calculations?",
      answer: "Yes, most calculators allow you to save, print, or export your results. Look for the export buttons in each tool."
    },
    {
      question: "Why do I need to sign in for some features?",
      answer: "Signing in allows us to save your preferences, provide personalized results, and give you access to advanced features while keeping your data secure."
    },
    {
      question: "How can I report an issue or suggest a feature?",
      answer: "Use our contact form or the in-app feedback feature. We value user feedback and regularly update our tools based on suggestions."
    }
  ];

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-subtle pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">Frequently Asked Questions</CardTitle>
              <p className="text-center text-muted-foreground">Common questions about MapleMetrics</p>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <AccordionTrigger className="text-left font-medium hover:text-primary transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default FAQ;