import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    
    // In a real app, you would fetch the post data based on the ID
    // For now, we'll simulate this with sample data
    const samplePosts = [
      {
        id: 1,
        title: "Understanding React Hooks: A Deep Dive",
        excerpt: "Explore the power of React Hooks and how they can simplify your functional components while maintaining state and lifecycle methods.",
        content: `
          <h2>Introduction to React Hooks</h2>
          <p>React Hooks have revolutionized the way we write React components. Introduced in React 16.8, Hooks allow you to use state and other React features without writing a class component.</p>
          
          <h2>useState Hook</h2>
          <p>The useState hook is perhaps the most fundamental hook in React. It allows you to add state to functional components:</p>
          <pre><code class="language-javascript">
  import React, { useState } from 'react';
  
  function Counter() {
    const [count, setCount] = useState(0);
    
    return (
      &lt;div&gt;
        &lt;p&gt;You clicked {count} times&lt;/p&gt;
        &lt;button onClick={() => setCount(count + 1)}&gt;
          Click me
        &lt;/button&gt;
      &lt;/div&gt;
    );
  }
          </code></pre>
          
          <h2>useEffect Hook</h2>
          <p>The useEffect hook lets you perform side effects in functional components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes:</p>
          <pre><code class="language-javascript">
  import React, { useState, useEffect } from 'react';
  
  function Example() {
    const [count, setCount] = useState(0);
  
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      // Update the document title using the browser API
      document.title = \`You clicked $\{count\} times\`;
    });
  
    return (
      &lt;div&gt;
        &lt;p&gt;You clicked {count} times&lt;/p&gt;
        &lt;button onClick={() => setCount(count + 1)}&gt;
          Click me
        &lt;/button&gt;
      &lt;/div&gt;
    );
  }
          </code></pre>
          
          <h2>Custom Hooks</h2>
          <p>Building your own Hooks lets you extract component logic into reusable functions. Here's an example of a custom hook for data fetching:</p>
          <pre><code class="language-javascript">
  import { useState, useEffect } from 'react';
  
  function useFriendStatus(friendID) {
    const [isOnline, setIsOnline] = useState(null);
  
    useEffect(() => {
      function handleStatusChange(status) {
        setIsOnline(status.isOnline);
      }
  
      ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
      return () => {
        ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
      };
    });
  
    return isOnline;
  }
          </code></pre>
          
          <h2>Best Practices</h2>
          <ul>
            <li>Only call Hooks at the top level of your React function</li>
            <li>Only call Hooks from React function components or custom Hooks</li>
            <li>Use array destructuring for useState to give meaningful names</li>
            <li>Optimize performance with useCallback and useMemo when necessary</li>
          </ul>
          
          <h2>Conclusion</h2>
          <p>React Hooks provide a powerful way to use state and other React features in functional components. They make your code more readable, reusable, and easier to test. As you become more comfortable with the basic hooks, you'll find that custom hooks can significantly improve your code organization and reusability.</p>
        `,
        date: "May 15, 2023",
        readTime: "8 min read",
        category: "React",
        tags: ["React", "JavaScript", "Frontend", "Hooks"],
        image: "/Photos Simples/1716635911147.jpg",
        author: {
          name: "Rohullah Amin Sarwari",
          avatar: "/profile.jpg",
          bio: "Web & Software Developer and Computer Science Student"
        }
      }
    ];
    
    // Set related posts (excluding the current post)
    setRelatedPosts(samplePosts.filter(post => post.id !== parseInt(id)));
  }, [id]);

  // Sample post data (in a real app, this would come from an API)
  const post = {
    id: 1,
    title: "Understanding React Hooks: A Deep Dive",
    excerpt: "Explore the power of React Hooks and how they can simplify your functional components while maintaining state and lifecycle methods.",
    content: `
      <h2>Introduction to React Hooks</h2>
      <p>React Hooks have revolutionized the way we write React components. Introduced in React 16.8, Hooks allow you to use state and other React features without writing a class component.</p>
      
      <h2>useState Hook</h2>
      <p>The useState hook is perhaps the most fundamental hook in React. It allows you to add state to functional components:</p>
      <pre><code class="language-javascript">
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}
      </code></pre>
      
      <h2>useEffect Hook</h2>
      <p>The useEffect hook lets you perform side effects in functional components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes:</p>
      <pre><code class="language-javascript">
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = \`You clicked $\{count\} times\`;
  });

  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}
      </code></pre>
      
      <h2>Custom Hooks</h2>
      <p>Building your own Hooks lets you extract component logic into reusable functions. Here's an example of a custom hook for data fetching:</p>
      <pre><code class="language-javascript">
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
      </code></pre>
      
      <h2>Best Practices</h2>
      <ul>
        <li>Only call Hooks at the top level of your React function</li>
        <li>Only call Hooks from React function components or custom Hooks</li>
        <li>Use array destructuring for useState to give meaningful names</li>
        <li>Optimize performance with useCallback and useMemo when necessary</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>React Hooks provide a powerful way to use state and other React features in functional components. They make your code more readable, reusable, and easier to test. As you become more comfortable with the basic hooks, you'll find that custom hooks can significantly improve your code organization and reusability.</p>
    `,
    date: "May 15, 2023",
    readTime: "8 min read",
    category: "React",
    tags: ["React", "JavaScript", "Frontend", "Hooks"],
    image: "/Photos Simples/1716635911147.jpg",
    author: {
      name: "Rohullah Amin Sarwari",
      avatar: "/profile.jpg",
      bio: "Web & Software Developer and Computer Science Student"
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Back to Blog Link */}
          <Link 
            to="/blog" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8"
          >
            <i className="fas fa-arrow-left mr-2"></i> Back to Blog
          </Link>
          
          {/* Post Header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-full">
                {post.category}
              </span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm font-medium rounded-full">
                {post.readTime}
              </span>
            </div>
            
            <h1 className="text-4xl font-extrabold text-white mb-4">{post.title}</h1>
            
            <div className="flex items-center text-gray-400 text-sm">
              <div className="bg-gray-700 rounded-full w-10 h-10 overflow-hidden mr-3">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-white font-medium">{post.author.name}</div>
                <div>{post.date}</div>
              </div>
            </div>
          </div>
          
          {/* Post Image */}
          <div className="rounded-2xl overflow-hidden mb-10 shadow-2xl">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-96 object-cover"
            />
          </div>
          
          {/* Post Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400 prose-pre:bg-gray-900 prose-pre:text-gray-300 prose-li:text-gray-300">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-gray-700">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-800 text-blue-400 text-sm font-medium rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Author Bio */}
          <div className="mt-12 bg-gray-800 rounded-2xl p-6">
            <div className="flex items-center">
              <div className="bg-gray-700 rounded-full w-16 h-16 overflow-hidden mr-4">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{post.author.name}</h3>
                <p className="text-gray-400">{post.author.bio}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-300">
              Full-Stack Developer with expertise in modern web technologies. Passionate about creating 
              innovative solutions and sharing knowledge with the developer community.
            </p>
          </div>
        </div>
      </div>
      
      {/* Related Posts */}
      <div className={`mt-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl font-bold text-white text-center mb-12">Related Articles</h2>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.slice(0, 3).map((post, index) => (
            <div 
              key={post.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl transform transition duration-500 hover:scale-105 border border-gray-700"
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="px-2 py-1 bg-gray-700 text-blue-400 text-xs font-medium rounded">
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-xs">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{post.excerpt}</p>
                <Link 
                  to={`/blog/${post.id}`}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;