import {config} from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT_DIR = path.resolve(__dirname, '');
export const PUBLIC_DIR = path.resolve(__dirname, 'public');
export const CSS_DIR = path.resolve(__dirname, 'public/css');
export const JS_DIR	= path.resolve(__dirname, 'public/js');
export const HTML_DIR = path.resolve(__dirname, 'public/html');
export const IMG_DIR = path.resolve(__dirname, 'public/images');

config()

export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const DB_DATABASE = process.env.DB_DATABASE;

// config nodemailer with Gmail

export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = process.env.MAIL_PORT;
export const MAIL_PASS = process.env.MAIL_PASS;
export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_SERVICE = process.env.MAIL_SERVICE;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
