import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', 'products');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeFile(fileName) {
    try {
      const filePath = path.resolve(
        __dirname,
        '..',
        'static',
        'products',
        fileName,
      );
      fs.unlinkSync(filePath);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
