3.times do |i|
    Post.create(
      title: "Post #{i + 1}",
      category: 'Tea and Gossip',
      bod: 'Pss the tea is : ... '
    )
  end