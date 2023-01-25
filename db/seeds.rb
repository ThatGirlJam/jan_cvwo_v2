9.times do |i|
    Post.create(
      title: "Post #{i + 1}",
      category: 'some category',
      bod: 'Pss the tea is : ... '
    )
  end