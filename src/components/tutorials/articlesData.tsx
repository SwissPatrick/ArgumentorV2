
import { BookOpen, FileText, Lightbulb, PenTool, Brain } from "lucide-react";
import { Article } from "./ArticleCard";

export const articlesData: Article[] = [
    {
        id: 1,
        title: "Introduction to Argumentor",
        description: "Learn the basics of the Argumentor platform in 5 minutes.",
        type: "guide",
        duration: "5 min read",
        icon: BookOpen,
        content: `
      <h2 class="text-2xl font-bold mb-4">Introduction to Argumentor</h2>
      
      <p class="mb-4">Welcome to Argumentor! This short guide will introduce you to our platform and help you get started.</p>
      
      <h3 class="text-xl font-bold mt-5 mb-2">What is Argumentor?</h3>
      <p class="mb-4">Argumentor is a platform designed to help you structure, analyze, and strengthen your arguments. Whether you're writing an academic paper, preparing for a debate, or just trying to clarify your thinking, our tools can help you build more compelling and logically sound arguments.</p>
      
      <h3 class="text-xl font-bold mt-5 mb-2">Key Features</h3>
      <ul class="list-disc ml-6 mb-4 space-y-2">
        <li><strong>Argument Builder:</strong> Visually construct your arguments with blocks for claims, evidence, and objections.</li>
        <li><strong>AI Analysis:</strong> Get real-time feedback on your argument's structure and logic.</li>
        <li><strong>Pattern Templates:</strong> Start with proven argument structures for different contexts.</li>
        <li><strong>Collaboration:</strong> Share your arguments and get feedback from others.</li>
      </ul>
      
      <h3 class="text-xl font-bold mt-5 mb-2">Getting Started</h3>
      <ol class="list-decimal ml-6 mb-4 space-y-2">
        <li>Create an account or sign in</li>
        <li>Start a new argument from your dashboard</li>
        <li>Add your main claim and supporting evidence</li>
        <li>Use the analysis tools to identify weaknesses</li>
        <li>Refine your argument based on feedback</li>
      </ol>
      
      <p class="mt-4">Ready to dive deeper? Check out our other articles for more detailed guidance on specific features and techniques.</p>
    `
    },
    {
        id: 2,
        title: "Creating Your First Argument",
        description: "Step-by-step guide to building a basic argument structure.",
        type: "guide",
        duration: "3 min read",
        icon: FileText,
        content: `
      <h2 class="text-2xl font-bold mb-4">Creating Your First Argument</h2>
      
      <p class="mb-4">Follow these simple steps to create your first argument in Argumentor:</p>
      
      <h3 class="text-xl font-bold mt-4 mb-2">1. Start a New Argument</h3>
      <p class="mb-4">From your dashboard, click the "New Argument" button. Give your argument a clear title that reflects your main point.</p>
      
      <h3 class="text-xl font-bold mt-4 mb-2">2. Add Your Main Claim</h3>
      <p class="mb-4">Click the "+" button and select "Claim" to add your main assertion. Make it clear and specific. For example, instead of "Social media is bad," try "Excessive social media use negatively impacts teenage mental health."</p>
      
      <h3 class="text-xl font-bold mt-4 mb-2">3. Add Supporting Premises</h3>
      <p class="mb-4">Add "Premise" blocks to support your main claim. These should be reasons or evidence that back up your assertion. Connect them to your claim by dragging a line between them.</p>
      
      <h3 class="text-xl font-bold mt-4 mb-2">4. Consider Counterarguments</h3>
      <p class="mb-4">Add "Objection" blocks to represent opposing viewpoints. This strengthens your argument by showing you've considered alternative perspectives.</p>
      
      <h3 class="text-xl font-bold mt-4 mb-2">5. Analyze and Refine</h3>
      <p class="mb-4">Use the "Analyze" button to get feedback on your argument's structure and logic. Make improvements based on the suggestions.</p>
      
      <p class="mt-4">That's it! You've created your first structured argument. As you get more comfortable, you can explore more advanced features like evidence types, logical frameworks, and collaborative feedback.</p>
    `
    },
    {
        id: 3,
        title: "Using AI Analysis",
        description: "Leverage AI to identify weaknesses in your arguments.",
        type: "guide",
        duration: "4 min read",
        icon: Brain,
        content: `
      <h2 class="text-2xl font-bold mb-4">Using AI Analysis</h2>
      
      <p class="mb-4">One of Argumentor's most powerful features is our AI analysis tool. Here's how to use it effectively:</p>
      
      <h3 class="text-xl font-bold mt-5 mb-2">What the AI Analyzes</h3>
      <p class="mb-4">Our AI evaluates several aspects of your argument:</p>
      <ul class="list-disc ml-6 mb-4 space-y-2">
        <li><strong>Logical Structure:</strong> Are your claims properly supported by evidence?</li>
        <li><strong>Fallacies:</strong> Does your argument contain common reasoning errors?</li>
        <li><strong>Completeness:</strong> Are there gaps in your reasoning that need to be addressed?</li>
        <li><strong>Coherence:</strong> Do all parts of your argument work together effectively?</li>
      </ul>
      
      <h3 class="text-xl font-bold mt-5 mb-2">Running an Analysis</h3>
      <p class="mb-4">To analyze your argument:</p>
      <ol class="list-decimal ml-6 mb-4 space-y-2">
        <li>Build your argument with at least a main claim and supporting premises</li>
        <li>Click the "Analyze" button in the top toolbar</li>
        <li>Wait a few seconds for the AI to process your argument</li>
        <li>Review the analysis panel that appears on the right side</li>
      </ol>
      
      <h3 class="text-xl font-bold mt-5 mb-2">Understanding the Results</h3>
      <p class="mb-4">The analysis results are color-coded:</p>
      <ul class="list-disc ml-6 mb-4 space-y-2">
        <li><span class="text-green-500 font-medium">Green</span>: Strong elements of your argument</li>
        <li><span class="text-yellow-500 font-medium">Yellow</span>: Areas that could be improved</li>
        <li><span class="text-red-500 font-medium">Red</span>: Significant issues that should be addressed</li>
      </ul>
      
      <h3 class="text-xl font-bold mt-5 mb-2">Applying Suggestions</h3>
      <p class="mb-4">For each issue identified, the AI provides specific suggestions. Click on a suggestion to see more details and guidance on how to improve that aspect of your argument.</p>
      
      <p class="mt-4">Remember that the AI is a tool to enhance your thinking, not replace it. Always use your own judgment when deciding which suggestions to implement.</p>
    `
    },
    {
        id: 4,
        title: "Three Common Logical Fallacies",
        description: "Learn to identify and avoid basic reasoning errors.",
        type: "article",
        duration: "3 min read",
        icon: Lightbulb,
        content: `
      <h2 class="text-2xl font-bold mb-4">Three Common Logical Fallacies</h2>
      
      <p class="mb-4">Logical fallacies are errors in reasoning that can weaken your arguments. Here are three of the most common fallacies to watch out for:</p>
      
      <div class="space-y-6 mt-4">
        <div class="p-4 border border-border rounded-lg">
          <h4 class="font-bold text-lg text-primary">1. Ad Hominem</h4>
          <p class="mb-2"><strong>What it is:</strong> Attacking the person making the argument rather than addressing their points.</p>
          <p class="italic text-muted-foreground mb-2">Example: "You can't trust his economic policy because he's never had a real job."</p>
          <p class="font-medium">How to avoid it: Focus on addressing the substance of arguments, not the characteristics of the person making them.</p>
        </div>
        
        <div class="p-4 border border-border rounded-lg">
          <h4 class="font-bold text-lg text-primary">2. False Dilemma</h4>
          <p class="mb-2"><strong>What it is:</strong> Presenting only two options when more exist.</p>
          <p class="italic text-muted-foreground mb-2">Example: "Either we cut education funding, or we'll go bankrupt."</p>
          <p class="font-medium">How to avoid it: Consider the full range of possibilities and acknowledge that complex issues rarely have only two possible solutions.</p>
        </div>
        
        <div class="p-4 border border-border rounded-lg">
          <h4 class="font-bold text-lg text-primary">3. Appeal to Popularity</h4>
          <p class="mb-2"><strong>What it is:</strong> Claiming something is true because many people believe it.</p>
          <p class="italic text-muted-foreground mb-2">Example: "Most people think violent video games cause aggression, so it must be true."</p>
          <p class="font-medium">How to avoid it: Base your arguments on evidence and sound reasoning, not on what is commonly believed or popular opinion.</p>
        </div>
      </div>
      
      <div class="bg-primary/10 p-4 rounded-lg mt-6">
        <h4 class="font-bold mb-2">How Argumentor Helps</h4>
        <p>Our AI analysis automatically flags potential logical fallacies in your arguments and suggests ways to strengthen your reasoning.</p>
      </div>
      
      <p class="mt-4">By avoiding these common fallacies, you'll create more compelling and logically sound arguments that can withstand scrutiny.</p>
    `
    },
    {
        id: 5,
        title: "Structuring Rebuttals",
        description: "How to effectively counter opposing arguments.",
        type: "article",
        duration: "4 min read",
        icon: PenTool,
        content: `
      <h2 class="text-2xl font-bold mb-4">Structuring Effective Rebuttals</h2>
      
      <p class="mb-4">A strong argument doesn't just make its own case—it also addresses opposing viewpoints. Here's how to structure effective rebuttals:</p>
      
      <h3 class="text-xl font-bold mt-5 mb-2">1. Accurately Represent the Opposition</h3>
      <p class="mb-4">Before countering an argument, make sure you understand it correctly:</p>
      <ul class="list-disc ml-6 mb-4 space-y-1">
        <li>State the opposing view clearly and fairly</li>
        <li>Avoid creating "straw man" versions that are easy to knock down</li>
        <li>If possible, quote the exact language used by the opposition</li>
      </ul>
      
      <h3 class="text-xl font-bold mt-5 mb-2">2. Identify the Core Issue</h3>
      <p class="mb-4">Focus your rebuttal on the central point of disagreement:</p>
      <ul class="list-disc ml-6 mb-4 space-y-1">
        <li>Is it a factual dispute about what is true?</li>
        <li>Is it a moral disagreement about what is right?</li>
        <li>Is it a practical question about what works?</li>
      </ul>
      
      <h3 class="text-xl font-bold mt-5 mb-2">3. Choose Your Approach</h3>
      <p class="mb-4">Different types of rebuttals work for different situations:</p>
      <div class="space-y-3 mb-4">
        <div class="p-3 bg-muted rounded-lg">
          <span class="font-bold">Factual correction:</span> "The data actually shows the opposite trend..."
        </div>
        <div class="p-3 bg-muted rounded-lg">
          <span class="font-bold">Logical flaw identification:</span> "This argument assumes X, but that's not necessarily true..."
        </div>
        <div class="p-3 bg-muted rounded-lg">
          <span class="font-bold">Alternative interpretation:</span> "These facts could also be explained by..."
        </div>
        <div class="p-3 bg-muted rounded-lg">
          <span class="font-bold">Concession with qualification:</span> "While X is true in some cases, it doesn't apply when..."
        </div>
      </div>
      
      <h3 class="text-xl font-bold mt-5 mb-2">4. Support with Evidence</h3>
      <p class="mb-4">Back up your rebuttal with strong evidence:</p>
      <ul class="list-disc ml-6 mb-4 space-y-1">
        <li>Data and statistics</li>
        <li>Expert opinions</li>
        <li>Historical examples</li>
        <li>Logical reasoning</li>
      </ul>
      
      <h3 class="text-xl font-bold mt-5 mb-2">5. Maintain a Respectful Tone</h3>
      <p class="mb-4">How you present your rebuttal matters almost as much as its content:</p>
      <ul class="list-disc ml-6 mb-4 space-y-1">
        <li>Focus on ideas, not personal attacks</li>
        <li>Acknowledge valid points in opposing arguments</li>
        <li>Use confident but not dismissive language</li>
      </ul>
      
      <div class="bg-primary/10 p-4 rounded-lg mt-5">
        <h4 class="font-bold mb-2">In Argumentor</h4>
        <p>Use "Objection" blocks to represent opposing views and "Rebuttal" blocks to connect your responses to those objections.</p>
      </div>
      
      <p class="mt-4">Effective rebuttals demonstrate that you've thoroughly considered all sides of an issue, making your own position more credible and persuasive.</p>
    `
    },
    {
        id: 6,
        title: "Evidence Types and Their Uses",
        description: "A quick guide to different types of evidence.",
        type: "guide",
        duration: "3 min read",
        icon: FileText,
        content: `
      <h2 class="text-2xl font-bold mb-4">Evidence Types and Their Uses</h2>
      
      <p class="mb-4">Not all evidence is created equal. Different types of evidence work better for different kinds of arguments. Here's a quick guide:</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 mt-4">
        <div class="p-4 border border-border rounded-lg">
          <h4 class="font-bold text-primary mb-2">Statistical Evidence</h4>
          <p class="mb-2">Numbers, percentages, and data points that quantify your claims.</p>
          <p class="text-sm text-muted-foreground"><strong>Best for:</strong> Demonstrating patterns, trends, or the scale of an issue</p>
          <p class="text-sm italic mt-2">"Studies show that 85% of customers prefer companies with sustainable practices."</p>
        </div>
        
        <div class="p-4 border border-border rounded-lg">
          <h4 class="font-bold text-primary mb-2">Testimonial Evidence</h4>
          <p class="mb-2">Statements from witnesses, experts, or those with direct experience.</p>
          <p class="text-sm text-muted-foreground"><strong>Best for:</strong> Adding credibility and human perspective</p>
          <p class="text-sm italic mt-2">"Dr. Chen, who has researched this topic for 20 years, confirms that..."</p>
        </div>
        
        <div class="p-4 border border-border rounded-lg">
          <h4 class="font-bold text-primary mb-2">Anecdotal Evidence</h4>
          <p class="mb-2">Specific examples or stories that illustrate your point.</p>
          <p class="text-sm text-muted-foreground"><strong>Best for:</strong> Making abstract concepts concrete and relatable</p>
          <p class="text-sm italic mt-2">"When Maria implemented this approach in her classroom, student engagement increased immediately."</p>
        </div>
        
        <div class="p-4 border border-border rounded-lg">
          <h4 class="font-bold text-primary mb-2">Historical Evidence</h4>
          <p class="mb-2">References to past events that provide context or precedent.</p>
          <p class="text-sm text-muted-foreground"><strong>Best for:</strong> Showing patterns over time or learning from past outcomes</p>
          <p class="text-sm italic mt-2">"Similar economic policies implemented in the 1990s resulted in significant job growth."</p>
        </div>
      </div>
      
      <h3 class="text-xl font-bold mt-5 mb-2">Choosing the Right Evidence</h3>
      <p class="mb-4">Consider these factors when selecting evidence:</p>
      <ul class="list-disc ml-6 mb-4 space-y-2">
        <li><strong>Relevance:</strong> How directly does it support your specific claim?</li>
        <li><strong>Credibility:</strong> Is the source trustworthy and knowledgeable?</li>
        <li><strong>Recency:</strong> Is the evidence current enough to be applicable?</li>
        <li><strong>Audience:</strong> What type of evidence will most resonate with your specific audience?</li>
      </ul>
      
      <h3 class="text-xl font-bold mt-5 mb-2">Using Evidence in Argumentor</h3>
      <p class="mb-4">When adding evidence to your argument structure:</p>
      <ol class="list-decimal ml-6 mb-4 space-y-2">
        <li>Create an "Evidence" block from the block menu</li>
        <li>Select the evidence type from the dropdown</li>
        <li>Enter your evidence with proper citation if applicable</li>
        <li>Connect it to the claim it supports</li>
      </ol>
      
      <p class="mt-4">Strong arguments typically use multiple types of evidence to create a comprehensive case that appeals to both logic and emotion.</p>
    `
    },
    {
        id: 7,
        title: "Writing Clear Claims",
        description: "How to formulate precise and effective claims.",
        type: "article",
        duration: "3 min read",
        icon: PenTool,
        content: `
      <h2 class="text-2xl font-bold mb-4">Writing Clear Claims</h2>
      
      <p class="mb-4">Claims are the backbone of any argument—they're the assertions you're trying to prove. Here's how to write claims that are clear, precise, and effective:</p>
      
      <h3 class="text-xl font-bold mt-5 mb-2">Characteristics of Strong Claims</h3>
      
      <div class="space-y-4 mb-6 mt-4">
        <div class="flex items-start gap-3">
          <div class="bg-primary/20 p-1.5 rounded-full mt-0.5">✓</div>
          <div>
            <p class="font-bold">Specific</p>
            <p class="text-muted-foreground">Narrow enough to be adequately supported within your argument</p>
            <div class="mt-1 space-y-1">
              <p class="text-sm italic text-red-500">Weak: "Social media is harmful."</p>
              <p class="text-sm italic text-green-500">Strong: "Excessive social media use contributes to sleep disruption in teenagers."</p>
            </div>
          </div>
        </div>
        
        <div class="flex items-start gap-3">
          <div class="bg-primary/20 p-1.5 rounded-full mt-0.5">✓</div>
          <div>
            <p class="font-bold">Precise</p>
            <p class="text-muted-foreground">Uses clear language that minimizes ambiguity</p>
            <div class="mt-1 space-y-1">
              <p class="text-sm italic text-red-500">Weak: "School funding should be better."</p>
              <p class="text-sm italic text-green-500">Strong: "Public school funding should be increased by at least 10% to provide adequate resources for STEM education."</p>
            </div>
          </div>
        </div>
        
        <div class="flex items-start gap-3">
          <div class="bg-primary/20 p-1.5 rounded-full mt-0.5">✓</div>
          <div>
            <p class="font-bold">Debatable</p>
            <p class="text-muted-foreground">Not obviously true or false; reasonable people could disagree</p>
            <div class="mt-1 space-y-1">
              <p class="text-sm italic text-red-500">Weak: "The Earth orbits the sun." (This is a fact, not a claim requiring argument)</p>
              <p class="text-sm italic text-green-500">Strong: "Space exploration should be prioritized over deep-sea exploration in research funding."</p>
            </div>
          </div>
        </div>
        
        <div class="flex items-start gap-3">
          <div class="bg-primary/20 p-1.5 rounded-full mt-0.5">✓</div>
          <div>
            <p class="font-bold">Significant</p>
            <p class="text-muted-foreground">Addresses an important issue that matters to your audience</p>
            <div class="mt-1 space-y-1">
              <p class="text-sm italic text-red-500">Weak: "Chocolate ice cream tastes better than vanilla."</p>
              <p class="text-sm italic text-green-500">Strong: "Implementing a four-day work week would improve employee productivity and well-being."</p>
            </div>
          </div>
        </div>
      </div>
      
      <h3 class="text-xl font-bold mt-5 mb-2">Types of Claims</h3>
      <p class="mb-4">Different arguments require different types of claims:</p>
      
      <ul class="list-disc ml-6 mb-4 space-y-2">
        <li><strong>Factual claims</strong> assert that something is or is not the case</li>
        <li><strong>Value claims</strong> make judgments about what is good, bad, right, or wrong</li>
        <li><strong>Policy claims</strong> argue for or against a specific course of action</li>
        <li><strong>Causal claims</strong> assert that one thing causes or is caused by another</li>
      </ul>
      
      <h3 class="text-xl font-bold mt-5 mb-2">Testing Your Claims</h3>
      <p class="mb-4">Before finalizing a claim, ask yourself:</p>
      <ol class="list-decimal ml-6 mb-4 space-y-2">
        <li>Could I realistically support this with the available evidence?</li>
        <li>Would my audience understand exactly what I'm asserting?</li>
        <li>Have I avoided vague qualifiers like "many," "some," or "a lot"?</li>
        <li>Is this claim focused enough to address within my argument's scope?</li>
      </ol>
      
      <div class="bg-primary/10 p-4 rounded-lg mt-5">
        <h4 class="font-bold mb-2">In Argumentor</h4>
        <p>Use the "Claim Analysis" feature to receive AI feedback on the clarity and specificity of your claims. Look for the analysis icon next to any claim block.</p>
      </div>
      
      <p class="mt-4">Remember: A clear, well-formulated claim is half the battle in creating a persuasive argument.</p>
    `
    },
    {
        id: 8,
        title: "Keyboard Shortcuts",
        description: "Speed up your workflow with these handy shortcuts.",
        type: "guide",
        duration: "2 min read",
        icon: Lightbulb,
        content: `
      <h2 class="text-2xl font-bold mb-4">Keyboard Shortcuts</h2>
      
      <p class="mb-4">Master these keyboard shortcuts to work more efficiently in Argumentor:</p>
      
      <h3 class="text-xl font-bold mt-5 mb-2">General Shortcuts</h3>
      
      <div class="grid grid-cols-2 gap-2 mb-6">
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">Ctrl + N</span>
          <span class="ml-2">New argument</span>
        </div>
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">Ctrl + S</span>
          <span class="ml-2">Save argument</span>
        </div>
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">Ctrl + /</span>
          <span class="ml-2">Show all shortcuts</span>
        </div>
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">Ctrl + Z</span>
          <span class="ml-2">Undo</span>
        </div>
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">Ctrl + Shift + Z</span>
          <span class="ml-2">Redo</span>
        </div>
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">Ctrl + F</span>
          <span class="ml-2">Search in argument</span>
        </div>
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">Ctrl + P</span>
          <span class="ml-2">Print argument</span>
        </div>
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">Esc</span>
          <span class="ml-2">Close modals</span>
        </div>
      </div>
      
      <h3 class="text-xl font-bold mt-5 mb-2">Block Shortcuts</h3>
      
      <div class="grid grid-cols-2 gap-2 mb-6">
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">Ctrl + 1</span>
          <span class="ml-2">Add claim block</span>
        </div>
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">Ctrl + 2</span>
          <span class="ml-2">Add premise block</span>
        </div>
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">Ctrl + 3</span>
          <span class="ml-2">Add evidence block</span>
        </div>
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">Ctrl + 4</span>
          <span class="ml-2">Add objection block</span>
        </div>
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">Delete</span>
          <span class="ml-2">Delete selected block</span>
        </div>
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">Ctrl + D</span>
          <span class="ml-2">Duplicate block</span>
        </div>
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">Tab</span>
          <span class="ml-2">Navigate between blocks</span>
        </div>
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">Ctrl + Click</span>
          <span class="ml-2">Multi-select blocks</span>
        </div>
      </div>
      
      <h3 class="text-xl font-bold mt-5 mb-2">Connection Shortcuts</h3>
      
      <div class="grid grid-cols-2 gap-2 mb-6">
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">C</span>
          <span class="ml-2">Create connection (when block selected)</span>
        </div>
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">Shift + Click</span>
          <span class="ml-2">Select multiple connections</span>
        </div>
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">Delete</span>
          <span class="ml-2">Delete selected connection</span>
        </div>
        <div class="p-2 border border-border rounded-lg">
          <span class="font-mono bg-muted px-1.5 py-0.5 rounded text-sm">1-5</span>
          <span class="ml-2">Set connection strength (when selected)</span>
        </div>
      </div>
      
      <div class="bg-primary/10 p-4 rounded-lg mt-4">
        <h4 class="font-bold mb-2">Tip</h4>
        <p>You can customize these shortcuts in Settings → Keyboard Shortcuts.</p>
      </div>
      
      <p class="mt-4">Print this guide or keep it handy while you're learning—you'll be working faster in no time!</p>
    `
    },
];
