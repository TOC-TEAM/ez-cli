export default {
  routes: [
    {
      path: '/',
      component: '../layouts',
      routes: [
        {
          path: '/',
          component: '../pages',
        },
        {
          path: '/user',
          component: '../pages/user',
        },
        {
          path: '/operate',
          compnent: '../pages/operate',
        },
        {
          path: '/operate/:id',
          component: '../pages/operate/detail',
        },
      ],
    },
  ],
}
