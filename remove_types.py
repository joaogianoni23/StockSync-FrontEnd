import os
import re

def remove_typescript_types(content):
    # Remove interfaces
    content = re.sub(r'interface\s+\w+\s*{[^}]*}', '', content)
    # Remove type annotations
    content = re.sub(r':\s*React\.\w+', '', content)
    content = re.sub(r':\s*(string|number|boolean)\[\]', '', content)
    content = re.sub(r':\s*(string|number|boolean)', '', content)
    content = re.sub(r'<\w+>', '', content)
    content = re.sub(r'type\s+\w+\s*=\s*[^;]+;', '', content)
    content = re.sub(r'export\s+type\s+\w+\s*=\s*[^;]+;', '', content)
    # Remove generic types
    content = re.sub(r'<[\w\s|]+>', '', content)
    # Remove "extends" clauses
    content = re.sub(r'extends\s+React\.\w+<\w+>', '', content)
    # Remove React.FC
    content = re.sub(r':\s*React\.FC<\w+>', '', content)
    # Clean up extra spaces
    content = re.sub(r'\n\n\n+', '\n\n', content)
    return content

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.jsx'):
                filepath = os.path.join(root, file)
                print(f"Processing: {filepath}")
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = remove_typescript_types(content)
                    
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    
                    print(f"  ✓ Cleaned {filepath}")
                except Exception as e:
                    print(f"  ✗ Error processing {filepath}: {e}")

# Process components and app directories
print("Removing TypeScript types from JSX files...")
process_directory('components')
process_directory('contexts')
process_directory('app')
print("Done!")
