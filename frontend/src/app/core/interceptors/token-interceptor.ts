import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MainStore } from '../../shared/stores/main.store';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const mainStore = inject(MainStore)

  if (!mainStore.getToken()) {   return next(req);   }

  const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${mainStore.getToken()}`),
    });
  
    console.log(modifiedReq)

  return next(modifiedReq);
};
