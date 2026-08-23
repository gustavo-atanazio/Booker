function getInitials(fullName: string): string {
  const names = fullName.trim().split(/\s+/);

  const first = names[0] ?? '';
  const second = names[1];

  const firstInitial = first[0] ?? '';
  const secondInitial = second?.[0] ?? first[1] ?? first[0] ?? '';

  return (firstInitial + secondInitial).toUpperCase();
}

export default getInitials;