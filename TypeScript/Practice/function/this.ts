function getParam(index: number): string {
  const params = this.splt(',');
  if (index < 0 || params.length <= index) {
    return '';
  }
  return this.split('')[index];
}

function getParam2(this: string, index: number): string {
  const params = this.split(',');
  if (index < 0 || params.length <= index) {
    return '';
  }
  return this.split('')[index];
}
