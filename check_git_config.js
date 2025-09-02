// Simple script to check and update Git configuration
const { execSync } = require('child_process');
const fs = require('fs');

try {
  // Check current Git configuration
  console.log('Current Git configuration:');
  const gitConfig = execSync('git config --list').toString();
  console.log(gitConfig);
  
  // Check contributors in Git history
  console.log('\nContributors in Git history:');
  const contributors = execSync('git log --pretty=format:"%an <%ae>" | sort -u').toString();
  console.log(contributors);
  
  // Check if ruslanlap exists in contributors
  if (contributors.toLowerCase().includes('ruslanlap')) {
    console.log('\nFound "ruslanlap" in contributors');
  } else {
    console.log('\nNo "ruslanlap" found in contributors');
  }
  
} catch (error) {
  console.error('Error executing Git commands:', error.message);
}
