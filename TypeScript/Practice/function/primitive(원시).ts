interface String {
  getParam(this: string, index: number): string;
}
function getParam2(this: string, index: number): string {
  const params = this.split(',');
  if (index < 0 || params.length <= index) {
    return '';
  }
  return this.split('')[index];
}
String.prototype.getParam = getParam2;
console.log('asdf, 1234, ok'.getParam(1));
