import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  console.log(req.url);
  return next(req);
}
