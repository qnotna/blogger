import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  defaultMaxLength = 300;
  defaultSuffix = '...';

  transform(content: string, ...args: any[]): string {
    const maxLength = args.length > 0 ? parseInt(args[0], 10) : this.defaultMaxLength;
    const suffix = args.length > 1 ? args[1] : this.defaultSuffix;

    const textArea = document.createElement('textarea');
    textArea.innerHTML = content;

    const plainText = textArea.value ? String(textArea.value).replace(/<[^>]+>/gm, '') : '';
    const shortenedText = (plainText.length > maxLength)
    ? plainText.substring(0, maxLength) + suffix : plainText;

    return shortenedText;
  }

}
