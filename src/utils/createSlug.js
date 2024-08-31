export function createSlug(name, id) {
    return `${name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') 
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')}-${id}`;
  }
  