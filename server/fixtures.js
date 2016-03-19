if (Commands.find().count() === 0) {
  Commands.insert({
    cmds: ['/', '/clear', '/gif', '/lorem', '/meme', '/date', '/logout', '/nasa-mars', '/nasa-asteroids', '/nasa-apod', 'sudo']
  });
}
